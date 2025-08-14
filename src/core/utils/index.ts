// Centralized utilities export
// Barrel export for all utility functions

// Cache utilities
export * from './cache';
export { responseCache } from './cache';

// Performance utilities
export * from './performance';
export { performanceMonitor, measureAsync, measureSync, debounce, throttle } from './performance';

// Validation utilities
export * from './validation';
export { validator, commonRules } from './validation';

// Re-export commonly used functions
export type {
  PerformanceMetrics,
  ValidationRule,
  ValidationResult,
  CachedResponse
} from '../../types';

// Additional utility functions
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatTimestamp(timestamp: number | Date = Date.now()): string {
  return new Date(timestamp).toISOString();
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, char => char.toUpperCase());
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key of Object.keys(obj)) {
      clonedObj[key as keyof T] = deepClone(obj[key as keyof T]);
    }
    return clonedObj;
  }
  return obj;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delay = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const attempt = async () => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(error);
        } else {
          setTimeout(attempt, delay * attempts);
        }
      }
    };
    
    attempt();
  });
}

export function createLogger(context: string) {
  return {
    info: (message: string, data?: any) => {
      console.log(`[${context}] ${message}`, data || '');
    },
    warn: (message: string, data?: any) => {
      console.warn(`[${context}] ${message}`, data || '');
    },
    error: (message: string, error?: any) => {
      console.error(`[${context}] ${message}`, error || '');
    },
    debug: (message: string, data?: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[${context}] ${message}`, data || '');
      }
    }
  };
}
