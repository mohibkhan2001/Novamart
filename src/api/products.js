// src/api/products.js
import axios from "axios";
import { recordApiMetric } from "../utils/performanceMonitor";

const BASE = import.meta.env.VITE_API_URL || "https://dummyjson.com/products";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
const STORAGE_KEY_PREFIX = "novaMart_product_";
const STORAGE_KEY_BATCH = "novaMart_batch_";

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

export function buildProductsUrl({ limit = 30, skip = 0, q, category } = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("skip", String(skip));
  if (q) params.set("q", q);
  if (category) params.set("category", category);

  return `${BASE}?${params.toString()}`;
}

export async function fetchProducts({ limit = 0, skip = 0, q, category } = {}) {
  const url = buildProductsUrl({ limit, skip, q, category });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data = await res.json();
  return data;
}

/**
 * Save product to localStorage with all details (images, price, rating, discount)
 * @param {Object} product - Product object from API
 */
function saveProductToCache(product) {
  try {
    if (!product || !product.id) return;

    const storageKey = `${STORAGE_KEY_PREFIX}${product.id}`;
    const cacheData = {
      id: product.id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      discountPercentage: product.discountPercentage,
      images: product.images || [],
      description: product.description,
      category: product.category,
      brand: product.brand,
      stock: product.stock,
      timestamp: Date.now(),
    };

    localStorage.setItem(storageKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn("Failed to save product to cache:", error);
  }
}

/**
 * Get product from localStorage
 * @param {number} id - Product ID
 * @returns {Object|null} Cached product or null
 */
function getProductFromCache(id) {
  try {
    const storageKey = `${STORAGE_KEY_PREFIX}${id}`;
    const cached = localStorage.getItem(storageKey);
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(storageKey);
      return null;
    }

    return cacheData;
  } catch (error) {
    console.warn("Failed to retrieve product from cache:", error);
    return null;
  }
}

/**
 * Save batch of product IDs for later reference
 * @param {Array} ids - Array of product IDs
 */
function saveBatchIds(ids) {
  try {
    const storageKey = `${STORAGE_KEY_BATCH}${ids.join(",")}`;
    localStorage.setItem(storageKey, JSON.stringify({
      ids,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.warn("Failed to save batch IDs:", error);
  }
}

/**
 * Fetch multiple products by IDs with aggressive caching
 * Returns immediately if ALL products are in cache
 * @param {Array} ids - Array of product IDs to fetch
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProductsByIds(ids = []) {
  if (!ids || ids.length === 0) return [];

  try {
    const startTime = performance.now();
    
    // Try to get from cache first
    const cachedProducts = ids
      .map((id) => getProductFromCache(id))
      .filter((p) => p !== null);

    // If ALL products are cached, return immediately (no API call!)
    if (cachedProducts.length === ids.length) {
      console.log(`✅ Cache HIT: All ${ids.length} products from cache`);
      return cachedProducts;
    }

    // Save batch reference for tracking
    saveBatchIds(ids);

    // Find which IDs are not cached
    const cachedIds = cachedProducts.map((p) => p.id);
    const missingIds = ids.filter((id) => !cachedIds.includes(id));

    // Log what we're fetching
    console.log(`📡 Fetching ${missingIds.length}/${ids.length} products from API (${cachedIds.length} from cache)`);

    // Fetch missing products from API
    let freshProducts = [];
    if (missingIds.length > 0) {
      const apiStartTime = performance.now();
      
      const responses = await Promise.all(
        missingIds.map((id) =>
          apiClient.get(`/${id}`).catch((error) => {
            console.warn(`Failed to fetch product ${id}:`, error);
            return null;
          })
        )
      );

      const apiDuration = performance.now() - apiStartTime;
      recordApiMetric(`fetchProductsByIds(${missingIds.length} items)`, apiDuration, missingIds.length > 0);

      freshProducts = responses
        .filter((res) => res !== null)
        .map((res) => res.data);

      // Save each fresh product to cache
      freshProducts.forEach((product) => saveProductToCache(product));
    }

    // Combine cached and fresh products, maintaining original order
    const allProducts = ids
      .map((id) => {
        return (
          cachedProducts.find((p) => p.id === id) ||
          freshProducts.find((p) => p.id === id)
        );
      })
      .filter((p) => p !== undefined);

    return allProducts;
  } catch (error) {
    console.error("Failed to fetch products by IDs:", error);
    return [];
  }
}

/**
 * Clear all cached products
 */
export function clearProductCache() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (
        key.startsWith(STORAGE_KEY_PREFIX) ||
        key.startsWith(STORAGE_KEY_BATCH)
      ) {
        localStorage.removeItem(key);
      }
    });
    console.log("Product cache cleared");
  } catch (error) {
    console.warn("Failed to clear product cache:", error);
  }
}

/**
 * Get cache statistics (for debugging)
 */
export function getCacheStats() {
  try {
    const keys = Object.keys(localStorage);
    const productKeys = keys.filter((key) => key.startsWith(STORAGE_KEY_PREFIX));
    const batchKeys = keys.filter((key) => key.startsWith(STORAGE_KEY_BATCH));

    let totalSize = 0;
    productKeys.forEach((key) => {
      totalSize += localStorage.getItem(key).length;
    });

    return {
      cachedProducts: productKeys.length,
      cachedBatches: batchKeys.length,
      totalSizeBytes: totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
    };
  } catch (error) {
    console.warn("Failed to get cache stats:", error);
    return null;
  }
}
