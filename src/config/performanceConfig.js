// src/config/performanceConfig.js
/**
 * Performance Configuration
 * Centralized settings for all performance optimizations
 */

export const PERFORMANCE_CONFIG = {
  // Image Optimization
  IMAGE: {
    THUMBNAIL_WIDTH: 300,
    THUMBNAIL_QUALITY: 75,
    CACHE_DURATION: 1000 * 60 * 60 * 24 * 7, // 7 days
    MAX_CACHE_SIZE: 5 * 1024 * 1024, // 5MB
    LAZY_LOADING: true,
    ASYNC_DECODING: true,
    ERROR_FALLBACK: "https://via.placeholder.com/400x300?text=No+Image",
  },

  // Product Cache
  PRODUCT: {
    CACHE_DURATION: 1000 * 60 * 60 * 24, // 24 hours
    STORAGE_KEY_PREFIX: "novaMart_product_",
    BATCH_KEY_PREFIX: "novaMart_batch_",
    ENABLE_INDEXEDDB: true,
  },

  // Lazy Loading
  LAZY_LOAD: {
    ENABLED: true,
    ROOT_MARGIN: "200px", // Start loading 200px before viewport
    THRESHOLD: 0.01,
  },

  // API
  API: {
    BASE_URL: "https://dummyjson.com/products",
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // Performance Monitoring
  MONITORING: {
    ENABLED: true,
    LOG_SLOW_API: true, // Log API calls > 500ms
    LOG_SLOW_IMAGES: true, // Log images > 200ms
    AUTO_REPORT_ON_LOAD: true, // Auto log stats on page load
    AUTO_REPORT_DELAY: 2000, // Delay before auto-report
  },

  // Thresholds
  THRESHOLDS: {
    SLOW_API_TIME: 500, // ms
    SLOW_IMAGE_TIME: 200, // ms
    TARGET_LOAD_TIME: 500, // ms
  },
};

/**
 * Get optimized image settings
 */
export function getImageOptimizations() {
  return {
    width: PERFORMANCE_CONFIG.IMAGE.THUMBNAIL_WIDTH,
    quality: PERFORMANCE_CONFIG.IMAGE.THUMBNAIL_QUALITY,
    format: "auto",
    lazy: PERFORMANCE_CONFIG.IMAGE.LAZY_LOADING,
    asyncDecode: PERFORMANCE_CONFIG.IMAGE.ASYNC_DECODING,
  };
}

/**
 * Get API settings
 */
export function getApiSettings() {
  return {
    baseURL: PERFORMANCE_CONFIG.API.BASE_URL,
    timeout: PERFORMANCE_CONFIG.API.TIMEOUT,
  };
}

/**
 * Check if performance monitoring is enabled
 */
export function isMonitoringEnabled() {
  return PERFORMANCE_CONFIG.MONITORING.ENABLED;
}

/**
 * Log current configuration
 */
export function logPerformanceConfig() {
  console.group("⚙️ Performance Configuration");
  console.table({
    "Image Quality": `${PERFORMANCE_CONFIG.IMAGE.THUMBNAIL_QUALITY}%`,
    "Thumbnail Size": `${PERFORMANCE_CONFIG.IMAGE.THUMBNAIL_WIDTH}px`,
    "Cache Duration": `${(PERFORMANCE_CONFIG.PRODUCT.CACHE_DURATION / 1000 / 60 / 60).toFixed(0)} hours`,
    "Lazy Loading": PERFORMANCE_CONFIG.LAZY_LOAD.ENABLED ? "✅" : "❌",
    "Monitoring": PERFORMANCE_CONFIG.MONITORING.ENABLED ? "✅" : "❌",
    "Slow API Threshold": `${PERFORMANCE_CONFIG.THRESHOLDS.SLOW_API_TIME}ms`,
    "Slow Image Threshold": `${PERFORMANCE_CONFIG.THRESHOLDS.SLOW_IMAGE_TIME}ms`,
  });
  console.groupEnd();
}

export default PERFORMANCE_CONFIG;
