// src/utils/cacheManager.js
import { clearProductCache, getCacheStats } from "../api/products";

/**
 * Cache Manager Utility
 * Provides helper functions to manage product cache in localStorage
 */

const STORAGE_KEY_PREFIX = "novaMart_product_";
const STORAGE_KEY_BATCH = "novaMart_batch_";

/**
 * Get all cached product IDs
 */
export function getAllCachedProductIds() {
  const keys = Object.keys(localStorage);
  const productKeys = keys.filter((key) => key.startsWith(STORAGE_KEY_PREFIX));
  return productKeys.map((key) => parseInt(key.replace(STORAGE_KEY_PREFIX, "")));
}

/**
 * Get cached product by ID
 */
export function getCachedProduct(id) {
  try {
    const storageKey = `${STORAGE_KEY_PREFIX}${id}`;
    const cached = localStorage.getItem(storageKey);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.warn("Failed to get cached product:", error);
    return null;
  }
}

/**
 * Get all cached products
 */
export function getAllCachedProducts() {
  try {
    const ids = getAllCachedProductIds();
    return ids
      .map((id) => {
        const storageKey = `${STORAGE_KEY_PREFIX}${id}`;
        const cached = localStorage.getItem(storageKey);
        return cached ? JSON.parse(cached) : null;
      })
      .filter((p) => p !== null);
  } catch (error) {
    console.warn("Failed to get all cached products:", error);
    return [];
  }
}

/**
 * Export cache as JSON (for backup/debugging)
 */
export function exportCacheAsJSON() {
  try {
    const products = getAllCachedProducts();
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `novaMart_cache_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    console.log("Cache exported successfully");
  } catch (error) {
    console.error("Failed to export cache:", error);
  }
}

/**
 * Log cache statistics to console
 */
export function logCacheStats() {
  const stats = getCacheStats();
  if (stats) {
    console.table({
      "Cached Products": stats.cachedProducts,
      "Cached Batches": stats.cachedBatches,
      "Total Size (KB)": stats.totalSizeKB,
    });
  }
}

/**
 * Clear cache with confirmation (optional)
 */
export function clearCacheWithConfirm(confirm = false) {
  if (confirm || window.confirm("Are you sure you want to clear the product cache?")) {
    clearProductCache();
    console.log("Cache cleared");
  }
}

/**
 * Get cache health check
 */
export function getCacheHealthCheck() {
  try {
    const stats = getCacheStats();
    const products = getAllCachedProducts();
    const hasErrors = products.some((p) => !p.id || !p.price);

    return {
      status: hasErrors ? "warning" : "healthy",
      stats,
      productCount: products.length,
      hasCorruptedData: hasErrors,
    };
  } catch (error) {
    console.error("Cache health check failed:", error);
    return { status: "error", message: error.message };
  }
}
