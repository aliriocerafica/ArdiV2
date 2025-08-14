// Centralized response type definitions
// Consolidates all response-related interfaces

export interface BaseResponse {
  response: string;
  source?: string;
  category?: string;
  isInappropriate?: boolean;
  timestamp?: number;
}

export interface EnhancedResponse extends BaseResponse {
  thinkingProcess?: {
    id: string;
    confidence: number;
    sources: number;
    isEnhanced: boolean;
    analysisSteps: string[];
    knowledgeGaps: string[];
    learningOpportunities: string[];
  };
  suggestions?: string[];
  relatedTopics?: string[];
  metadata?: {
    processingTime: number;
    cacheHit: boolean;
    fallbackUsed: boolean;
  };
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: string;
  timestamp: number;
  requestId?: string;
}

export interface StreamingResponseChunk {
  id: string;
  type: 'thinking' | 'content' | 'complete' | 'error';
  content: string;
  metadata?: Record<string, any>;
}

// API Response interfaces
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  metadata?: {
    processingTime: number;
    version: string;
    requestId: string;
  };
}

// Chat-specific responses
export interface ChatResponse extends BaseResponse {
  messageId?: string;
  conversationId?: string;
  suggestions?: string[];
}

export interface EnhancedChatResponse extends EnhancedResponse {
  messageId?: string;
  conversationId?: string;
}

// Response status types
export type ResponseStatus = 'success' | 'error' | 'partial' | 'cached' | 'fallback';

export interface ResponseMetadata {
  status: ResponseStatus;
  processingTime: number;
  cacheHit: boolean;
  confidence: number;
  sources: string[];
  fallbackUsed: boolean;
}
