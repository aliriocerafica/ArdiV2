// API-related type definitions
// Consolidates all API request/response types

export interface ChatRequest {
  message: string;
  conversationId?: string;
  context?: string[];
  options?: {
    useEnhanced?: boolean;
    maxResponseTime?: number;
    includeMetadata?: boolean;
  };
}

export interface ChatRequestMetadata {
  userAgent?: string;
  clientId?: string;
  sessionId?: string;
  timestamp: number;
  requestId: string;
}

export interface EnhancedChatRequest extends ChatRequest {
  thinkingOptions?: {
    useWebSearch?: boolean;
    includeThinkingProcess?: boolean;
    confidenceThreshold?: number;
  };
}

// Rate limiting interfaces
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: number;
  windowStart: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

// API versioning
export interface APIVersion {
  version: string;
  deprecated?: boolean;
  deprecationDate?: string;
  migrationGuide?: string;
}

// Request validation
export interface ValidationRule {
  field: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Middleware interfaces
export interface MiddlewareContext {
  request: Request;
  response: Response;
  metadata: ChatRequestMetadata;
  rateLimitInfo?: RateLimitInfo;
}

export interface MiddlewareResult {
  continue: boolean;
  response?: Response;
  metadata?: Record<string, any>;
}
