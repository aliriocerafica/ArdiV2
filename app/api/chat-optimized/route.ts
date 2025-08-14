// Optimized Chat API with all enhancements
// This is the new high-performance API endpoint

import { NextRequest, NextResponse } from 'next/server';
import { validator, commonRules } from '../../../src/core/utils/validation';
import { responseCache } from '../../../src/core/utils/cache';
import { performanceMonitor } from '../../../src/core/utils/performance';
import { globalErrorHandler } from '../../../src/core/services/error-handler';
import { knowledgeProcessor } from '../../../src/core/services/knowledge-processor';
import { BaseResponse, EnhancedResponse, APIResponse } from '../../../src/types';

// Rate limiting store (simple in-memory implementation)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

/**
 * Enhanced POST handler with all optimizations
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = performance.now();
  const requestId = generateRequestId();
  
  try {
    // Rate limiting
    const clientId = getClientId(request);
    if (!checkRateLimit(clientId)) {
      return NextResponse.json({
        success: false,
        error: {
          error: 'Rate limit exceeded',
          code: 'RATE_LIMIT',
          details: 'Too many requests. Please try again later.',
          timestamp: Date.now(),
          requestId
        }
      } as APIResponse, { status: 429 });
    }

    // Parse and validate request
    const body = await request.json();
    const validation = validator.validate(body, commonRules.chatMessage);
    
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: {
          error: 'Invalid request',
          code: 'VALIDATION_ERROR',
          details: validation.errors?.map((e: {message?: string}) => String(e.message || 'Validation error')).join(', ') || 'Validation failed',
          timestamp: Date.now(),
          requestId
        }
      } as APIResponse, { status: 400 });
    }

    const { message } = body;
    const sanitizedMessage = validator.sanitizeString(message);

    // Enhanced content filtering
    if (await isInappropriateContent(sanitizedMessage)) {
      return NextResponse.json({
        success: true,
        data: {
          response: "I am not developed to respond to that kind of behavior. I'm here to help with legal case management questions. How can I assist you with your case today?",
          source: 'Content Filter',
          category: 'Safety',
          isInappropriate: true,
          metadata: {
            processingTime: performance.now() - startTime,
            cacheHit: false,
            fallbackUsed: false
          }
        } as EnhancedResponse
      } as APIResponse);
    }

    // Start performance monitoring
    const stopTimer = performanceMonitor.startTimer('optimized-chat');

    try {
      // Process with enhanced knowledge system
      const result = await knowledgeProcessor.processQuery(sanitizedMessage, {
        useCache: true,
        parallel: true,
        maxResults: 1,
        minConfidence: 0.3
      });

      const processingTime = performance.now() - startTime;

      if (result) {
        // Record successful metrics
        stopTimer();

        const response: EnhancedResponse = {
          response: result.content,
          source: result.source,
          category: result.category,
          metadata: {
            processingTime,
            cacheHit: result.metadata?.cacheHit || false,
            fallbackUsed: false
          }
        };

        return NextResponse.json({
          success: true,
          data: response,
          metadata: {
            processingTime,
            version: '2.0',
            requestId
          }
        } as APIResponse);
      }

      // No knowledge found - use fallback
      const fallbackResponse = await handleNoKnowledgeFound(sanitizedMessage);
      
      stopTimer();

      return NextResponse.json({
        success: true,
        data: {
          ...fallbackResponse,
          metadata: {
            processingTime: performance.now() - startTime,
            cacheHit: false,
            fallbackUsed: true
          }
        } as EnhancedResponse,
        metadata: {
          processingTime: performance.now() - startTime,
          version: '2.0',
          requestId
        }
      } as APIResponse);

    } catch (processingError) {
      // Use error handler for recovery
      const errorContext = globalErrorHandler.createContext('optimized-chat', {
        userMessage: sanitizedMessage,
        requestId
      });

      const fallbackResult = await globalErrorHandler.handleError(
        processingError as Error,
        errorContext
      );

      return NextResponse.json({
        success: true,
        data: {
          ...fallbackResult,
          metadata: {
            processingTime: performance.now() - startTime,
            cacheHit: false,
            fallbackUsed: true
          }
        } as EnhancedResponse,
        metadata: {
          processingTime: performance.now() - startTime,
          version: '2.0',
          requestId
        }
      } as APIResponse);
    }

  } catch (error) {
    console.error('Critical error in optimized chat API:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
        timestamp: Date.now(),
        requestId
      },
      metadata: {
        processingTime: performance.now() - startTime,
        version: '2.0',
        requestId
      }
    } as APIResponse, { status: 500 });
  }
}

/**
 * Enhanced content filtering
 */
async function isInappropriateContent(message: string): Promise<boolean> {
  const lowerMessage = message.toLowerCase();
  
  const inappropriatePatterns = [
    /\b(fuck|shit|bitch|ass|damn|hell|piss|crap|dick|cock|pussy|cunt|whore|slut)\b/gi,
    /\b(kill|murder|death|suicide|harm|hurt|attack|fight|violence|weapon|gun|knife|bomb)\b/gi,
    /\b(racist|sexist|homophobic|hate|discrimination)\b/gi
  ];
  
  return inappropriatePatterns.some(pattern => pattern.test(lowerMessage));
}

/**
 * Handle cases where no knowledge is found
 */
async function handleNoKnowledgeFound(message: string): Promise<BaseResponse> {
  // Check for greetings
  const greetingPatterns = [
    /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening)\b/i,
    /\bhello ardi\b/i
  ];
  
  if (greetingPatterns.some(pattern => pattern.test(message))) {
    return {
      response: "👋 Hi, I'm Ardi! I'm here to help you with legal case management, personal injury questions, medical records, and more. What can I assist you with today?",
      source: 'Greeting Handler',
      category: 'Greetings'
    };
  }

  // Generic helpful response
  const helpfulResponses = [
    "I'd be happy to help you with that. Could you provide a bit more detail about what specifically you're looking for?",
    "I want to make sure I give you the most accurate information. Could you rephrase your question or provide more context?",
    "I'm here to help with legal case management questions. Could you tell me more about your specific situation?",
    "Let me help you with that. Could you be more specific about what aspect you'd like to know about?"
  ];

  const randomResponse = helpfulResponses[Math.floor(Math.random() * helpfulResponses.length)];

  return {
    response: randomResponse,
    source: 'Helpful Response Generator',
    category: 'General Assistance'
  };
}

/**
 * Simple rate limiting check
 */
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientId);
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }
  
  if (clientData.count >= RATE_LIMIT) {
    return false;
  }
  
  clientData.count++;
  return true;
}

/**
 * Get client identifier for rate limiting
 */
function getClientId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return `client_${ip}`;
}

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * GET handler for health check and stats
 */
export async function GET(): Promise<NextResponse> {
  const stats = {
    status: 'healthy',
    version: '2.0',
    timestamp: new Date().toISOString(),
    performance: performanceMonitor.getOverallStats(),
    cache: responseCache.getStats(),
    knowledge: knowledgeProcessor.getDomainStats()
  };

  return NextResponse.json(stats);
}
