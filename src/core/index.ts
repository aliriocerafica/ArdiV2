// Main core module exports
// Central export point for all core functionality

// Export utilities
export * from './utils';

// Export services
export * from './services';

// Export types explicitly to avoid conflicts
export type {
  APIResponse,
  EnhancedResponse,
  KnowledgeResult,
  PerformanceMetrics,
  ValidationRule,
  ValidationResult
} from '../types';

// Convenience exports for common functionality from utils
export {
  // Cache utilities
  responseCache,
  
  // Performance monitoring
  performanceMonitor,
  measureAsync,
  measureSync,
  
  // Validation
  validator,
  commonRules
} from './utils';

// Initialize core systems on import
import { serviceManager } from './services';

// Auto-initialize in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  serviceManager.initialize().catch(console.error);
}
