// src/utils/performanceMonitor.js
/**
 * Performance Monitoring Utilities
 * Tracks and logs page load, image load, and API performance metrics
 */

const METRICS = {
  pageLoadStart: performance.now(),
  apiCallMetrics: [],
  imageLoadMetrics: [],
};

/**
 * Record API call performance
 * @param {string} endpoint - API endpoint called
 * @param {number} duration - Duration in ms
 * @param {boolean} success - Whether call succeeded
 */
export function recordApiMetric(endpoint, duration, success = true) {
  METRICS.apiCallMetrics.push({
    endpoint,
    duration,
    success,
    timestamp: Date.now(),
  });

  // Log if slow
  if (duration > 500) {
    console.warn(`🐌 Slow API: ${endpoint} took ${duration}ms`);
  }
}

/**
 * Record image load performance
 * @param {string} url - Image URL
 * @param {number} duration - Duration in ms
 * @param {number} size - File size in bytes
 */
export function recordImageMetric(url, duration, size = 0) {
  METRICS.imageLoadMetrics.push({
    url: url.substring(0, 50), // Truncate for logging
    duration,
    size,
    timestamp: Date.now(),
  });

  if (duration > 200) {
    console.warn(`📸 Slow image: ${duration}ms (${(size / 1024).toFixed(2)}KB)`);
  }
}

/**
 * Get page performance summary
 */
export function getPerformanceSummary() {
  const pageLoadTime = performance.now() - METRICS.pageLoadStart;

  // Calculate averages
  const avgApiTime =
    METRICS.apiCallMetrics.length > 0
      ? METRICS.apiCallMetrics.reduce((sum, m) => sum + m.duration, 0) /
        METRICS.apiCallMetrics.length
      : 0;

  const avgImageTime =
    METRICS.imageLoadMetrics.length > 0
      ? METRICS.imageLoadMetrics.reduce((sum, m) => sum + m.duration, 0) /
        METRICS.imageLoadMetrics.length
      : 0;

  const totalImageSize = METRICS.imageLoadMetrics.reduce(
    (sum, m) => sum + (m.size || 0),
    0
  );

  // Get Web Vitals if available
  const vitals = getWebVitals();

  return {
    pageLoadTime: pageLoadTime.toFixed(0),
    totalApiCalls: METRICS.apiCallMetrics.length,
    avgApiTime: avgApiTime.toFixed(0),
    totalImageLoads: METRICS.imageLoadMetrics.length,
    avgImageTime: avgImageTime.toFixed(0),
    totalImageSize: (totalImageSize / 1024).toFixed(2),
    webVitals: vitals,
  };
}

/**
 * Get Core Web Vitals metrics
 */
export function getWebVitals() {
  const vitals = {};

  // Largest Contentful Paint (LCP)
  try {
    const paintEntries = performance.getEntriesByType("paint");
    vitals.FCP = paintEntries
      .filter((e) => e.name === "first-contentful-paint")[0]
      ?.startTime.toFixed(0);
  } catch (e) {
    // ignored
  }

  // Layout Shifts (CLS)
  try {
    const layoutShiftEntries = performance.getEntriesByType("layout-shift");
    vitals.CLS = layoutShiftEntries
      .reduce((sum, e) => sum + (e.hadRecentInput ? 0 : e.value), 0)
      .toFixed(3);
  } catch (e) {
    // ignored
  }

  // First Input Delay (FID) - via PerformanceObserver if available
  vitals.Memory = (performance.memory?.usedJSHeapSize / 1048576).toFixed(2);

  return vitals;
}

/**
 * Log comprehensive performance report
 */
export function logPerformanceReport() {
  const summary = getPerformanceSummary();

  console.group("📊 Performance Report");
  console.table({
    "Page Load Time": `${summary.pageLoadTime}ms`,
    "Total API Calls": summary.totalApiCalls,
    "Avg API Time": `${summary.avgApiTime}ms`,
    "Total Image Loads": summary.totalImageLoads,
    "Avg Image Time": `${summary.avgImageTime}ms`,
    "Total Image Size": `${summary.totalImageSize}KB`,
    "JS Heap Size": `${summary.webVitals.Memory}MB`,
  });

  if (summary.webVitals.FCP) {
    console.log(`🎨 First Contentful Paint: ${summary.webVitals.FCP}ms`);
  }
  if (summary.webVitals.CLS) {
    console.log(`📏 Cumulative Layout Shift: ${summary.webVitals.CLS}`);
  }

  console.groupEnd();

  return summary;
}

/**
 * Performance mark helper
 * @param {string} name - Mark name
 * @param {string} action - 'start' or 'end'
 */
export function markPerformance(name, action = "start") {
  if (action === "start") {
    performance.mark(`${name}-start`);
  } else {
    performance.mark(`${name}-end`);
    try {
      performance.measure(name, `${name}-start`, `${name}-end`);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
    } catch (e) {
      console.warn(`Failed to measure ${name}`);
    }
  }
}

/**
 * Monitor component render performance
 * Usage: useEffect(() => { markPerformance("ComponentName"); return () => markPerformance("ComponentName", "end"); }, [])
 */
export function usePerformanceMonitor(componentName) {
  React.useEffect(() => {
    markPerformance(componentName);
    return () => markPerformance(componentName, "end");
  }, [componentName]);
}

/**
 * Analyze slow sections
 */
export function analyzeSlowestSections() {
  const summary = getPerformanceSummary();

  console.group("🔍 Performance Analysis");

  const slowApiCalls = METRICS.apiCallMetrics
    .filter((m) => m.duration > 500)
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5);

  const slowImages = METRICS.imageLoadMetrics
    .filter((m) => m.duration > 200)
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5);

  if (slowApiCalls.length > 0) {
    console.log("🐌 Slowest API Calls:");
    console.table(slowApiCalls);
  }

  if (slowImages.length > 0) {
    console.log("🐌 Slowest Images:");
    console.table(slowImages);
  }

  if (slowApiCalls.length === 0 && slowImages.length === 0) {
    console.log("✅ No performance bottlenecks detected!");
  }

  console.groupEnd();
}

// Auto-log performance on page unload (dev only)
if (process.env.NODE_ENV === "development") {
  window.addEventListener("beforeunload", () => {
    console.log(
      "Performance metrics available via logPerformanceReport() or analyzeSlowestSections()"
    );
  });
}

export default {
  recordApiMetric,
  recordImageMetric,
  getPerformanceSummary,
  logPerformanceReport,
  markPerformance,
  analyzeSlowestSections,
};
