// Performance monitoring and optimization utilities

import { PerformanceMetrics } from '../../types';

export class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics[]> = new Map();
  private readonly maxHistory = 1000;

  /**
   * Start performance tracking for an operation
   */
  startTimer(operationId: string): () => PerformanceMetrics {
    const startTime = performance.now();
    
    return (additionalData: Partial<PerformanceMetrics> = {}): PerformanceMetrics => {
      const endTime = performance.now();
      const metrics: PerformanceMetrics = {
        queryTime: endTime - startTime,
        cacheHit: false,
        domainSearched: [],
        resultsFound: 0,
        confidence: 0,
        ...additionalData
      };
      
      this.recordMetrics(operationId, metrics);
      return metrics;
    };
  }

  /**
   * Record performance metrics
   */
  recordMetrics(operationId: string, metrics: PerformanceMetrics): void {
    if (!this.metrics.has(operationId)) {
      this.metrics.set(operationId, []);
    }
    
    const operationMetrics = this.metrics.get(operationId)!;
    operationMetrics.push({
      ...metrics,
      timestamp: Date.now()
    } as PerformanceMetrics & { timestamp: number });
    
    // Keep only recent metrics
    if (operationMetrics.length > this.maxHistory) {
      operationMetrics.splice(0, operationMetrics.length - this.maxHistory);
    }
  }

  /**
   * Get performance statistics for an operation
   */
  getStats(operationId: string): {
    count: number;
    avgTime: number;
    minTime: number;
    maxTime: number;
    cacheHitRate: number;
    avgConfidence: number;
    recentTrend: 'improving' | 'degrading' | 'stable';
  } | null {
    const metrics = this.metrics.get(operationId);
    if (!metrics || metrics.length === 0) {
      return null;
    }
    
    const times = metrics.map(m => m.queryTime);
    const cacheHits = metrics.filter(m => m.cacheHit).length;
    const confidences = metrics.map(m => m.confidence);
    
    // Calculate trend (last 20% vs previous 20%)
    const recentCount = Math.max(5, Math.floor(metrics.length * 0.2));
    const recentMetrics = metrics.slice(-recentCount);
    const previousMetrics = metrics.slice(-recentCount * 2, -recentCount);
    
    let recentTrend: 'improving' | 'degrading' | 'stable' = 'stable';
    if (previousMetrics.length > 0) {
      const recentAvg = recentMetrics.reduce((sum, m) => sum + m.queryTime, 0) / recentMetrics.length;
      const previousAvg = previousMetrics.reduce((sum, m) => sum + m.queryTime, 0) / previousMetrics.length;
      const change = (recentAvg - previousAvg) / previousAvg;
      
      if (change < -0.1) recentTrend = 'improving';
      else if (change > 0.1) recentTrend = 'degrading';
    }
    
    return {
      count: metrics.length,
      avgTime: times.reduce((sum, t) => sum + t, 0) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      cacheHitRate: cacheHits / metrics.length,
      avgConfidence: confidences.reduce((sum, c) => sum + c, 0) / confidences.length,
      recentTrend
    };
  }

  /**
   * Get overall system performance
   */
  getOverallStats(): {
    totalOperations: number;
    avgResponseTime: number;
    cacheEfficiency: number;
    topSlowOperations: { operation: string; avgTime: number }[];
  } {
    let totalOps = 0;
    let totalTime = 0;
    let totalCacheHits = 0;
    const operationStats: { operation: string; avgTime: number }[] = [];
    
    for (const [operationId, metrics] of this.metrics.entries()) {
      const times = metrics.map(m => m.queryTime);
      const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length;
      const cacheHits = metrics.filter(m => m.cacheHit).length;
      
      totalOps += metrics.length;
      totalTime += times.reduce((sum, t) => sum + t, 0);
      totalCacheHits += cacheHits;
      
      operationStats.push({ operation: operationId, avgTime });
    }
    
    operationStats.sort((a, b) => b.avgTime - a.avgTime);
    
    return {
      totalOperations: totalOps,
      avgResponseTime: totalOps > 0 ? totalTime / totalOps : 0,
      cacheEfficiency: totalOps > 0 ? totalCacheHits / totalOps : 0,
      topSlowOperations: operationStats.slice(0, 5)
    };
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
  }

  /**
   * Clear metrics for specific operation
   */
  clearOperation(operationId: string): void {
    this.metrics.delete(operationId);
  }
}

/**
 * Utility for measuring async function performance
 */
export async function measureAsync<T>(
  fn: () => Promise<T>,
  label?: string
): Promise<{ result: T; duration: number }> {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  
  if (label) {
    console.log(`${label}: ${duration.toFixed(2)}ms`);
  }
  
  return { result, duration };
}

/**
 * Utility for measuring sync function performance
 */
export function measureSync<T>(
  fn: () => T,
  label?: string
): { result: T; duration: number } {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  
  if (label) {
    console.log(`${label}: ${duration.toFixed(2)}ms`);
  }
  
  return { result, duration };
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();
