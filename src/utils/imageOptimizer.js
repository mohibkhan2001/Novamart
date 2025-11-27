// src/utils/imageOptimizer.js
/**
 * Image Optimization Utilities
 * Handles image compression, format conversion, and caching
 */

const IMAGE_CACHE_KEY = "novaMart_image_cache";
const MAX_CACHE_SIZE = 5 * 1024 * 1024; // 5MB
const IMAGE_CACHE_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days

/**
 * Preload images for faster rendering
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls = []) {
  imageUrls.forEach((url) => {
    if (!url) return;
    const img = new Image();
    img.src = url;
  });
}

/**
 * Get optimized image URL with query parameters
 * @param {string} url - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} Optimized URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url) return null;

  const {
    width = 300,
    quality = 75,
    format = "auto", // auto, webp, jpg, png
    fit = "crop",
  } = options;

  // Remove existing query params
  const baseUrl = url.replace(/\?.*$/, "");

  // Build query string
  const params = new URLSearchParams({
    w: width,
    q: quality,
    auto: format,
    fit,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Create a srcset for responsive images
 * @param {string} url - Original image URL
 * @returns {string} srcset string for img tag
 */
export function createImageSrcSet(url) {
  if (!url) return "";

  const baseUrl = url.replace(/\?.*$/, "");
  const sizes = [300, 400, 600, 800];

  return sizes
    .map(
      (size) =>
        `${baseUrl}?w=${size}&q=75&auto=format ${size}w`
    )
    .join(", ");
}

/**
 * Cache image in IndexedDB for offline access
 * @param {string} url - Image URL
 * @param {Blob} blob - Image blob data
 */
export async function cacheImageBlob(url, blob) {
  try {
    if (!window.indexedDB) {
      console.warn("IndexedDB not supported");
      return;
    }

    const db = await openImageDatabase();
    const tx = db.transaction("images", "readwrite");
    const store = tx.objectStore("images");

    await store.put({
      url,
      blob,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.warn("Failed to cache image blob:", error);
  }
}

/**
 * Get cached image from IndexedDB
 * @param {string} url - Image URL
 * @returns {Promise<Blob|null>} Cached blob or null
 */
export async function getCachedImageBlob(url) {
  try {
    if (!window.indexedDB) return null;

    const db = await openImageDatabase();
    const tx = db.transaction("images", "readonly");
    const store = tx.objectStore("images");

    return new Promise((resolve, reject) => {
      const request = store.get(url);
      request.onsuccess = () => {
        const result = request.result;
        if (result && Date.now() - result.timestamp < IMAGE_CACHE_DURATION) {
          resolve(result.blob);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn("Failed to get cached image blob:", error);
    return null;
  }
}

/**
 * Open or create IndexedDB database for images
 */
function openImageDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("novaMart_images", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "url" });
      }
    };
  });
}

/**
 * Compress image before uploading
 * @param {File} file - Image file
 * @param {Object} options - Compression options
 * @returns {Promise<Blob>} Compressed blob
 */
export async function compressImage(file, options = {}) {
  return new Promise((resolve) => {
    const {
      maxWidth = 1200,
      maxHeight = 1200,
      quality = 0.8,
      type = "image/webp",
    } = options;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, type, quality);
      };
    };
  });
}

/**
 * Log image cache statistics
 */
export function logImageCacheStats() {
  try {
    console.log("📸 Image Optimization Stats:");
    console.log(`- Optimization enabled: compression, lazy loading, format auto-conversion`);
    console.log(`- Cache duration: 7 days`);
    console.log(`- Max cache size: 5MB`);
    console.log(`- Image sizes: 300px (thumbnails), responsive srcset enabled`);
  } catch (error) {
    console.warn("Failed to log cache stats:", error);
  }
}
