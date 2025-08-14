// Advanced error handling and recovery system

import { ErrorResponse, ResponseMetadata } from '../../types';

export interface ErrorContext {
  operation: string;
  userMessage?: string;
  timestamp: Date;
  requestId?: string;
  metadata?: Record<string, any>;
}

export interface FallbackStrategy {
  name: string;
  priority: number;
  canHandle: (error: Error, context: ErrorContext) => boolean;
  execute: (error: Error, context: ErrorContext) => Promise<any>;
}

export class ErrorHandler {
  private fallbackStrategies: FallbackStrategy[] = [];
  private errorLog: Array<{ error: Error; context: ErrorContext; timestamp: Date }> = [];
  private readonly maxLogSize = 1000;

  constructor() {
    this.initializeDefaultStrategies();
  }

  /**
   * Handle error with fallback strategies
   */
  async handleError(error: Error, context: ErrorContext): Promise<any> {
    // Log the error
    this.logError(error, context);
    
    // Try fallback strategies in priority order
    const applicableStrategies = this.fallbackStrategies
      .filter(strategy => strategy.canHandle(error, context))
      .sort((a, b) => b.priority - a.priority);
    
    for (const strategy of applicableStrategies) {
      try {
        console.log(`Attempting fallback strategy: ${strategy.name}`);
        const result = await strategy.execute(error, context);
        
        // Add metadata indicating fallback was used
        if (result && typeof result === 'object') {
          result.metadata = {
            ...result.metadata,
            fallbackUsed: true,
            fallbackStrategy: strategy.name,
            originalError: error.message
          };
        }
        
        return result;
      } catch (fallbackError) {
        console.warn(`Fallback strategy ${strategy.name} failed:`, fallbackError);
        continue;
      }
    }
    
    // If all fallbacks fail, return a default error response
    return this.getDefaultErrorResponse(error, context);
  }

  /**
   * Register a custom fallback strategy
   */
  registerFallbackStrategy(strategy: FallbackStrategy): void {
    this.fallbackStrategies.push(strategy);
    this.fallbackStrategies.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Log error for analysis
   */
  private logError(error: Error, context: ErrorContext): void {
    this.errorLog.push({
      error,
      context,
      timestamp: new Date()
    });
    
    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.splice(0, this.errorLog.length - this.maxLogSize);
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error handled:', {
        message: error.message,
        operation: context.operation,
        stack: error.stack
      });
    }
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    totalErrors: number;
    errorsByOperation: Record<string, number>;
    recentErrors: Array<{ operation: string; message: string; timestamp: Date }>;
    mostCommonErrors: Array<{ message: string; count: number }>;
  } {
    const errorsByOperation: Record<string, number> = {};
    const errorCounts: Record<string, number> = {};
    
    for (const log of this.errorLog) {
      const operation = log.context.operation;
      const message = log.error.message;
      
      errorsByOperation[operation] = (errorsByOperation[operation] || 0) + 1;
      errorCounts[message] = (errorCounts[message] || 0) + 1;
    }
    
    const mostCommonErrors = Object.entries(errorCounts)
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    const recentErrors = this.errorLog
      .slice(-20)
      .map(log => ({
        operation: log.context.operation,
        message: log.error.message,
        timestamp: log.timestamp
      }));
    
    return {
      totalErrors: this.errorLog.length,
      errorsByOperation,
      recentErrors,
      mostCommonErrors
    };
  }

  /**
   * Initialize default fallback strategies
   */
  private initializeDefaultStrategies(): void {
    // Knowledge base fallback
    this.registerFallbackStrategy({
      name: 'knowledge-base-fallback',
      priority: 100,
      canHandle: (error, context) => context.operation === 'enhanced-chat',
      execute: async (error, context) => {
        // Try standard knowledge base if enhanced fails
        const { findKnowledge } = await import('../../../lib/knowledgeIndex');
        if (context.userMessage) {
          const result = findKnowledge(context.userMessage);
          if (result) {
            return {
              response: result.content,
              source: result.source,
              category: result.category,
              fallbackUsed: true
            };
          }
        }
        throw new Error('Knowledge base fallback failed');
      }
    });

    // Generic response fallback
    this.registerFallbackStrategy({
      name: 'generic-response',
      priority: 50,
      canHandle: () => true,
      execute: async (error, context) => {
        const responses = [
          "I'm having trouble processing your request right now. Could you please try rephrasing your question?",
          "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
          "I'm unable to provide a complete response at the moment. Is there a specific aspect of your question I can help with?",
          "I'm currently having some processing issues. Would you like to try asking your question differently?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        return {
          response: randomResponse,
          source: 'Error Recovery System',
          category: 'System Message',
          isErrorFallback: true
        };
      }
    });

    // Network error fallback
    this.registerFallbackStrategy({
      name: 'network-error-fallback',
      priority: 75,
      canHandle: (error) => error.message.includes('network') || error.message.includes('timeout'),
      execute: async () => {
        return {
          response: "I'm experiencing network connectivity issues. Please check your connection and try again.",
          source: 'Error Recovery System',
          category: 'Network Error',
          isErrorFallback: true
        };
      }
    });
  }

  /**
   * Get default error response when all fallbacks fail
   */
  private getDefaultErrorResponse(error: Error, context: ErrorContext): ErrorResponse {
    return {
      error: 'An unexpected error occurred while processing your request.',
      code: 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: Date.now(),
      requestId: context.requestId
    };
  }

  /**
   * Clear error log
   */
  clearLog(): void {
    this.errorLog = [];
  }

  /**
   * Create error context
   */
  createContext(operation: string, options: Partial<ErrorContext> = {}): ErrorContext {
    return {
      operation,
      timestamp: new Date(),
      requestId: this.generateRequestId(),
      ...options
    };
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Wrapper function for safe async operations
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  context: ErrorContext,
  errorHandler?: ErrorHandler
): Promise<T | any> {
  try {
    return await operation();
  } catch (error) {
    const handler = errorHandler || globalErrorHandler;
    return handler.handleError(error as Error, context);
  }
}

/**
 * Wrapper function for safe sync operations
 */
export function safeSync<T>(
  operation: () => T,
  context: ErrorContext,
  errorHandler?: ErrorHandler
): T | any {
  try {
    return operation();
  } catch (error) {
    const handler = errorHandler || globalErrorHandler;
    // For sync operations, log error and return simple error response
    console.error('Sync operation error:', error);
    return {
      success: false,
      error: {
        error: error instanceof Error ? error.message : 'An error occurred',
        code: 'SYNC_ERROR',
        timestamp: Date.now()
      }
    };
  }
}

// Global error handler instance
export const globalErrorHandler = new ErrorHandler();
