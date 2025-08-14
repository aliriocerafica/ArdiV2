// Response Caching System
// High-performance caching for knowledge responses

import { KnowledgeResult, CachedResponse } from '../../types';

export class ResponseCache {
  private cache = new Map<string, CachedResponse>();
  private readonly maxSize: number;
  private readonly defaultTTL: number; // Time to live in milliseconds
  
  constructor(maxSize: number = 1000, defaultTTL: number = 5 * 60 * 1000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  /**
   * Generate a cache key from query string
   */
  private generateCacheKey(query: string): string {
    // Normalize query for consistent caching
    const normalized = query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s]/g, '');
    
    return `cache_${this.hashString(normalized)}`;
  }

  /**
   * Simple hash function for cache keys
   */
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Get cached response if available and not expired
   */
  getCachedResponse(query: string): KnowledgeResult | null {
    const key = this.generateCacheKey(query);
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    // Update hit count and return result
    cached.hitCount++;
    
    // Add cache metadata
    const result = {
      ...cached.result,
      metadata: {
        ...cached.result.metadata,
        cacheHit: true,
        hitCount: cached.hitCount,
        cacheAge: Date.now() - cached.timestamp
      }
    };
    
    return result;
  }

  /**
   * Cache a response
   */
  cacheResponse(query: string, result: KnowledgeResult, ttl?: number): void {
    const key = this.generateCacheKey(query);
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    
    const cachedResponse: CachedResponse = {
      result: {
        ...result,
        metadata: {
          ...result.metadata,
          cacheHit: false
        }
      },
      timestamp: Date.now(),
      expiresAt,
      hitCount: 0
    };
    
    this.cache.set(key, cachedResponse);
  }

  /**
   * Invalidate cache entries by pattern
   */
  invalidateByPattern(pattern: string): number {
    const regex = new RegExp(pattern, 'i');
    let deletedCount = 0;
    
    for (const [key, cached] of this.cache.entries()) {
      if (regex.test(cached.result.content) || 
          regex.test(cached.result.category) ||
          regex.test(cached.result.source)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }
    
    return deletedCount;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const entries = Array.from(this.cache.values());
    const totalHits = entries.reduce((sum, entry) => sum + entry.hitCount, 0);
    const avgAge = entries.length > 0 
      ? entries.reduce((sum, entry) => sum + (Date.now() - entry.timestamp), 0) / entries.length 
      : 0;
    
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      totalHits,
      avgAge: Math.round(avgAge / 1000), // in seconds
      hitRate: entries.length > 0 ? totalHits / entries.length : 0
    };
  }

  /**
   * Remove expired entries
   */
  cleanup(): number {
    const now = Date.now();
    let deletedCount = 0;
    
    for (const [key, cached] of this.cache.entries()) {
      if (now > cached.expiresAt) {
        this.cache.delete(key);
        deletedCount++;
      }
    }
    
    return deletedCount;
  }

  /**
   * Evict oldest entries when cache is full
   */
  private evictOldest(): void {
    const entries = Array.from(this.cache.entries());
    entries.sort(([, a], [, b]) => a.timestamp - b.timestamp);
    
    // Remove oldest 10% of entries
    const removeCount = Math.max(1, Math.floor(entries.length * 0.1));
    for (let i = 0; i < removeCount; i++) {
      this.cache.delete(entries[i][0]);
    }
  }

  /**
   * Get memory usage estimate (approximate)
   */
  getMemoryUsage(): number {
    let totalSize = 0;
    for (const [key, cached] of this.cache.entries()) {
      totalSize += key.length * 2; // UTF-16 characters
      totalSize += JSON.stringify(cached).length * 2;
    }
    return totalSize; // bytes
  }
}

// Singleton instance
export const responseCache = new ResponseCache();
