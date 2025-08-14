// Centralized services export
// Barrel export for all core services

// Error handling service - export functions only
export { globalErrorHandler, safeAsync, safeSync } from './error-handler';

// Knowledge processing service - export class only
export { knowledgeProcessor } from './knowledge-processor';

// Import for internal use
import { knowledgeProcessor } from './knowledge-processor';
import { globalErrorHandler } from './error-handler';

// Service initialization and management
export class ServiceManager {
  private static instance: ServiceManager;
  private initialized = false;

  private constructor() {}

  static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }
    return ServiceManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Preload high-priority knowledge domains
      await knowledgeProcessor.preloadHighPriorityDomains();
      
      // Initialize error handler with custom strategies if needed
      // globalErrorHandler is already initialized
      
      this.initialized = true;
      console.log('Services initialized successfully');
    } catch (error) {
      console.error('Failed to initialize services:', error);
      throw error;
    }
  }

  getStatus(): {
    initialized: boolean;
    knowledgeStats: any;
    errorStats: any;
  } {
    return {
      initialized: this.initialized,
      knowledgeStats: knowledgeProcessor.getDomainStats(),
      errorStats: globalErrorHandler.getErrorStats()
    };
  }

  async restart(): Promise<void> {
    this.initialized = false;
    await this.initialize();
  }
}

// Singleton service manager
export const serviceManager = ServiceManager.getInstance();
