import { NextRequest, NextResponse } from 'next/server';
import { findKnowledge, shouldUseBasicKnowledge, getFallbackResponse } from '../../../lib/knowledgeIndex';
import { filterContent } from '../../../lib/contentFilter';

import { customAIModel, isCustomAIModelReady } from '../../../lib/customAIModel';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Content filtering first
    const contentCheck = filterContent(message);
    if (contentCheck.isInappropriate && contentCheck.suggestedResponse) {
      return NextResponse.json({
        response: contentCheck.suggestedResponse,
        source: 'Content Filter',
        category: 'Safety',
        isFiltered: true,
        severity: contentCheck.severity
      });
    }

    // Check if this should be handled by basic knowledge (Ardi identity questions)
    if (shouldUseBasicKnowledge(message)) {
      const knowledgeResult = findKnowledge(message);
      if (knowledgeResult) {
        return NextResponse.json({
          response: knowledgeResult.content,
          tableContent: knowledgeResult.tableContent,
          source: knowledgeResult.source,
          category: knowledgeResult.category,
          isBasicKnowledge: true
        });
      }
    }

    // Use custom AI model if available, otherwise fallback
    if (isCustomAIModelReady()) {
      try {
        const aiResponse = await customAIModel.generateResponse(message, {
          temperature: 0.7,
          maxTokens: 1000
        });
        
        return NextResponse.json({
          response: aiResponse.content,
          source: 'Custom AI Model',
          category: aiResponse.category || 'AI Generated',
          confidence: aiResponse.confidence,
          tokens_used: aiResponse.tokensUsed,
          processing_time: aiResponse.processingTime
        });
      } catch (aiError) {
        console.error('Custom AI model error:', aiError);
        // Continue to fallback response
      }
    }

    // Fallback response when custom AI model is not ready or failed
    const fallbackResponse = getFallbackResponse(message);
    return NextResponse.json({
      response: fallbackResponse.content,
      source: fallbackResponse.source,
      category: fallbackResponse.category,
      needsAIModelIntegration: !isCustomAIModelReady(),
      modelStatus: isCustomAIModelReady() ? 'failed' : 'not_configured'
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ready_for_ai_integration',
    message: 'Chat API is ready for custom AI model integration',
    timestamp: new Date().toISOString(),
    features: {
      contentFiltering: 'active',
      basicKnowledge: 'active',
      customAIModel: isCustomAIModelReady() ? 'active' : 'pending_integration'
    },
    modelInfo: isCustomAIModelReady() ? customAIModel.getModelInfo() : null
  });
}