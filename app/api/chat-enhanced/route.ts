import { NextRequest, NextResponse } from 'next/server';
import { findKnowledge } from '../../../lib/knowledgeIndex';
import { thinkingEngine } from '../../../lib/thinkingEngine';
import { webSearchService } from '../../../lib/webSearchService';
import { knowledgeGenerator } from '../../../lib/knowledgeGenerator';
import { learningSystem } from '../../../lib/learningSystem';

// Enhanced response interface that includes thinking process metadata
interface EnhancedChatResponse {
  response: string;
  source?: string;
  category?: string;
  isInappropriate?: boolean;
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
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Content filtering (preserve existing functionality)
    const lowerMessage = message.toLowerCase();
    const inappropriatePatterns = [
      /\b(fuck|shit|bitch|ass|damn|hell|piss|crap|dick|cock|pussy|cunt|whore|slut)\b/gi,
      /\b(kill|murder|death|suicide|harm|hurt|attack|fight|violence|weapon|gun|knife|bomb)\b/gi
    ];
    
    const hasInappropriateContent = inappropriatePatterns.some(pattern => pattern.test(lowerMessage));
    
    if (hasInappropriateContent) {
      return NextResponse.json({
        response: "I am not developed to respond on that kind of behavior. I'm here to help with legal case management questions. How can I assist you with your case today?",
        isInappropriate: true
      } as EnhancedChatResponse);
    }

    const userMessage = message.toLowerCase();
    
    // Check for specific greeting patterns first (preserve existing functionality)
    if (userMessage.includes('hello ardi') || userMessage.includes('hello ard') || 
        userMessage.includes('hi ardi') || userMessage.includes('hey ardi')) {
      return NextResponse.json({
        response: "👋 Hi, I'm Ardi!\n\nI'm ARDI, which stands for Ardent Knowledge Database Intelligence. I'm an AI assistant specifically designed to help legal professionals with case management and paralegal services. My purpose is to provide you with comprehensive support for legal workflows, document organization, deadline tracking, and client communication optimization. I work with Ardent Paralegal Business Solutions Inc to make your legal operations more efficient and organized. I'm here to assist you with any questions about case management, legal processes, or our services.\n\nWhat can I assist you with today? 😊"
      } as EnhancedChatResponse);
    }

    // Handle general greetings (preserve existing functionality)
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey') || 
        userMessage.includes('good morning') || userMessage.includes('good afternoon') || 
        userMessage.includes('good evening') || userMessage.includes('howdy') || userMessage.includes('greetings')) {
      const greetingResponses = [
        "## 👋 Hi, I'm Ardi!\n\nI'm ARDI, which stands for Ardent Knowledge Database Intelligence. I'm an AI assistant specifically designed to help legal professionals with case management and paralegal services. My purpose is to provide you with comprehensive support for legal workflows, document organization, deadline tracking, and client communication optimization. I work with Ardent Paralegal Business Solutions Inc to make your legal operations more efficient and organized. I'm here to assist you with any questions about case management, legal processes, or our services.\n\n### What can I assist you with today? 😊",
        "## 🌟 Hi, I'm Ardi!\n\nI'm ARDI - Ardent Knowledge Database Intelligence. I'm your AI companion for legal excellence, created to help legal professionals streamline their case management processes. My role is to provide intelligent support for document organization, deadline tracking, client communications, and workflow optimization. I combine advanced AI capabilities with deep knowledge of legal processes to help you manage cases more effectively. Whether you need help with case organization, legal research, or client communication, I'm here to support your legal operations.\n\n### How can I support your legal operations today?"
      ];
      return NextResponse.json({
        response: greetingResponses[Math.floor(Math.random() * greetingResponses.length)]
      } as EnhancedChatResponse);
    }

    // Handle ARDI acronym questions (preserve existing functionality)
    if (userMessage.includes('what does ardi stand for') || userMessage.includes('what is ardi stands for') || 
        userMessage.includes('ardi stands for') || userMessage.includes('what does ardi mean') || 
        userMessage.includes('ardi acronym') || userMessage.includes('ardi abbreviation') || 
        userMessage.includes('meaning of ardi')) {
      return NextResponse.json({
        response: "🤖 **ARDI** represents **Ardent Knowledge Database Intelligence** - a sophisticated second-generation AI assistant specifically engineered for legal professionals and case management excellence. As the embodiment of passionate dedication to legal excellence, I combine comprehensive knowledge mastery with advanced information management capabilities to provide AI-powered decision support and automated workflow optimization. My architecture focuses on legal operations optimization through seamless workflow automation, offering advanced document analysis, deadline tracking, and client communication capabilities. I excel in case lifecycle management, document categorization and retrieval, deadline tracking with automated alerts, and client communication optimization, all while maintaining attorney-client privilege protection, HIPAA compliance for healthcare matters, state bar requirement adherence, and enterprise-grade data security. My mission is to transform legal practice through intelligent automation, comprehensive knowledge management, and unwavering commitment to operational excellence. As Version 2, I represent months of development focused on real-world legal professional feedback and am designed to be your indispensable partner in achieving legal operational excellence!"
      } as EnhancedChatResponse);
    }

    // Handle company and services questions (preserve existing functionality)
    if (userMessage.includes('ardent') || userMessage.includes('paralegal') || userMessage.includes('services') || 
        userMessage.includes('company') || userMessage.includes('business solutions') || 
        userMessage.includes('about the company') || userMessage.includes('your company')) {
      return NextResponse.json({
        response: "🏢 Ardent Paralegal Business Solutions Inc is a premier legal services company dedicated to revolutionizing how law firms operate through intelligent case management and comprehensive paralegal support.\n\n🎯 **Our Mission:**\nTo empower legal professionals with cutting-edge technology and expert paralegal services that enhance efficiency, improve client satisfaction, and drive business growth.\n\n⭐ **Core Services:**\n• **Case Management Excellence** - End-to-end case lifecycle management\n• **Document Management** - Advanced organization and retrieval systems\n• **Paralegal Support** - Certified paralegal professionals\n• **Workflow Optimization** - Process improvement and automation\n• **Client Communication** - Professional client relationship management\n• **Legal Research Support** - Comprehensive research assistance\n• **Compliance Management** - Regulatory and ethical compliance monitoring\n\n🚀 **What Sets Us Apart:**\n• AI-powered solutions (like me!) that learn and adapt\n• Experienced paralegal professionals with diverse expertise\n• Customizable solutions for firms of all sizes\n• 24/7 support and system monitoring\n• Proven track record of improving firm efficiency by 40%+\n• HIPAA and attorney-client privilege compliant systems\n\n💼 **Industries We Serve:**\n• Personal Injury Law\n• Corporate Law\n• Family Law\n• Criminal Defense\n• Real Estate Law\n• Employment Law\n• Immigration Law\n\nWould you like to learn more about how we can specifically help your practice area?"
      } as EnhancedChatResponse);
    }

    // Handle help and support questions (preserve existing functionality)
    if (userMessage.includes('help') || userMessage.includes('support') || userMessage.includes('assistance') || 
        userMessage.includes('how can you help') || userMessage.includes('what can you do') || 
        userMessage.includes('capabilities') || userMessage.includes('features')) {
      return NextResponse.json({
        response: "🤝 I'm here to provide comprehensive support for all your legal operations needs! As ARDI Version 2, I offer extensive capabilities designed to transform your legal practice.\n\n🛠️ **How I Can Help You:**\n\n**📋 Case Management:**\n• Organize and track cases from intake to resolution\n• Automate workflow processes and task assignments\n• Monitor case progress and generate reports\n\n**📄 Document Management:**\n• Intelligent document organization and categorization\n• Template creation and management\n• Version control and collaboration tools\n\n**⏰ Schedule & Deadline Management:**\n• Critical date tracking with automated reminders\n• Court calendar integration\n• Conflict checking and resolution\n\n**👥 Client Relations:**\n• Communication templates and automation\n• Client portal management\n• Satisfaction tracking and improvement\n\n**💡 Strategic Guidance:**\n• Workflow optimization recommendations\n• Best practice implementation\n• Technology integration planning\n• Efficiency improvement strategies\n\n**📊 Analytics & Reporting:**\n• Performance metrics and insights\n• Financial analysis and projections\n• Productivity measurements\n\n🎯 **Getting Started:**\nSimply tell me about your specific challenges or goals, and I'll provide tailored recommendations and step-by-step guidance. Whether you're looking to implement new systems or optimize existing processes, I'm here to help!\n\nWhat area would you like to focus on first?"
      } as EnhancedChatResponse);
    }

    // NEW ENHANCED PROCESSING STARTS HERE
    const startTime = Date.now();

    try {
      // Step 1: Use ThinkingEngine to process the query
      const thinkingResult = await thinkingEngine.processQuery(message);
      const responseTime = Date.now() - startTime;

      // Step 2: Check if we should use traditional knowledge base first
      const existingKnowledge = findKnowledge(message);
      
      let finalResponse: string;
      let enhancedResponse: EnhancedChatResponse;

      if (existingKnowledge && thinkingResult.thinkingProcess.confidence < 0.8) {
        // Use existing knowledge if thinking engine isn't highly confident
        finalResponse = existingKnowledge.tableContent || existingKnowledge.content;
        
        enhancedResponse = {
          response: finalResponse,
          source: existingKnowledge.source,
          category: existingKnowledge.category,
          thinkingProcess: {
            id: thinkingResult.thinkingProcess.id,
            confidence: 0.9, // High confidence for existing knowledge
            sources: 1,
            isEnhanced: false,
            analysisSteps: ['Used existing knowledge base'],
            knowledgeGaps: [],
            learningOpportunities: []
          }
        };
      } else if (thinkingResult.isEnhanced) {
        // Use enhanced thinking engine response
        finalResponse = thinkingResult.response;
        
        // Get adaptive suggestions
        const suggestions = learningSystem.getAdaptiveResponseSuggestions(message);
        const prediction = learningSystem.predictQuerySuccess(message);
        
        enhancedResponse = {
          response: finalResponse,
          source: 'AI Enhanced Response',
          category: 'Intelligent Analysis',
          thinkingProcess: {
            id: thinkingResult.thinkingProcess.id,
            confidence: thinkingResult.thinkingProcess.confidence,
            sources: thinkingResult.thinkingProcess.informationGathered.length,
            isEnhanced: true,
            analysisSteps: thinkingResult.thinkingProcess.analysisSteps,
            knowledgeGaps: thinkingResult.thinkingProcess.knowledgeGaps,
            learningOpportunities: thinkingResult.thinkingProcess.learningOpportunities
          },
          suggestions: suggestions.length > 0 ? suggestions : undefined
        };

        // Generate new knowledge if applicable
        if (thinkingResult.thinkingProcess.knowledgeGaps.length > 0 && 
            thinkingResult.thinkingProcess.confidence > 0.7) {
          
          const webResults = await webSearchService.searchForQuery(
            message,
            thinkingResult.thinkingProcess.analysisSteps[0] || 'general',
            thinkingResult.thinkingProcess.learningOpportunities
          );

          if (webResults.length > 0) {
            const generatedKnowledge = await knowledgeGenerator.generateKnowledge(
              message,
              'general',
              thinkingResult.thinkingProcess.informationGathered,
              webResults
            );

            if (generatedKnowledge) {
              // Store the generated knowledge for future use
              enhancedResponse.relatedTopics = generatedKnowledge.keywords.slice(0, 5);
            }
          }
        }
      } else {
        // Fall back to existing knowledge or default response
        if (existingKnowledge) {
          finalResponse = existingKnowledge.tableContent || existingKnowledge.content;
          enhancedResponse = {
            response: finalResponse,
            source: existingKnowledge.source,
            category: existingKnowledge.category
          };
        } else {
          // Use the fallback response from the original API
          finalResponse = "📚 **Knowledge Base Update Request**\n\nI apologize, but I don't currently have information about that specific topic in my knowledge base. As of now, that is not on our knowledge base.\n\n**🔧 How to Get Help:**\nPlease message our IT team for that so they can add it to my knowledge base. This will help me provide you with accurate and helpful information in the future.\n\n**📞 Contact Information:**\n• **IT Support**: Please reach out to our technical team\n• **Subject**: Knowledge Base Addition Request\n• **Include**: Your specific question or topic\n\n**💡 In the meantime, you can:**\n• Try asking a different question from my available topics\n• Type `/Questions` to see all available questions I can answer\n• Contact our support team for immediate assistance\n\nI'm constantly learning and expanding my knowledge base to better serve you!";
          
          enhancedResponse = {
            response: finalResponse,
            thinkingProcess: {
              id: thinkingResult.thinkingProcess.id,
              confidence: 0.3,
              sources: 0,
              isEnhanced: true,
              analysisSteps: ['No existing knowledge found', 'Generated helpful fallback response'],
              knowledgeGaps: ['Knowledge not available in current database'],
              learningOpportunities: ['Opportunity to expand knowledge base for this topic']
            }
          };
        }
      }

      // Record the interaction for learning
      learningSystem.recordInteraction(
        thinkingResult.thinkingProcess,
        finalResponse,
        responseTime,
        thinkingResult.thinkingProcess.confidence > 0.6
      );

      return NextResponse.json(enhancedResponse);

    } catch (thinkingError) {
      console.error('Enhanced thinking engine error:', thinkingError);
      
      // Fall back to original knowledge base if thinking engine fails
      const knowledgeResult = findKnowledge(message);
      if (knowledgeResult) {
        return NextResponse.json({
          response: knowledgeResult.tableContent || knowledgeResult.content,
          source: knowledgeResult.source,
          category: knowledgeResult.category
        } as EnhancedChatResponse);
      }

      // Final fallback - original unknown response
      return NextResponse.json({
        response: "📚 **Knowledge Base Update Request**\n\nI apologize, but I don't currently have information about that specific topic in my knowledge base. As of now, that is not on our knowledge base.\n\n**🔧 How to Get Help:**\nPlease message our IT team for that so they can add it to my knowledge base. This will help me provide you with accurate and helpful information in the future.\n\n**📞 Contact Information:**\n• **IT Support**: Please reach out to our technical team\n• **Subject**: Knowledge Base Addition Request\n• **Include**: Your specific question or topic\n\n**💡 In the meantime, you can:**\n• Try asking a different question from my available topics\n• Type `/Questions` to see all available questions I can answer\n• Contact our support team for immediate assistance\n\nI'm constantly learning and expanding my knowledge base to better serve you!"
      } as EnhancedChatResponse);
    }

  } catch (error) {
    console.error('Enhanced Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Additional endpoint for feedback collection
export async function PUT(request: NextRequest) {
  try {
    const { processId, rating, feedback, categories } = await request.json();

    if (!processId || !rating) {
      return NextResponse.json(
        { error: 'Process ID and rating are required' },
        { status: 400 }
      );
    }

    // Create and record feedback
    const userFeedback = learningSystem.createFeedback(
      processId,
      '', // Will be filled from process history
      '', // Will be filled from process history
      rating,
      feedback,
      categories || ['general']
    );

    // Update thinking engine with feedback
    thinkingEngine.recordUserFeedback(processId, rating === 'positive');

    return NextResponse.json({ 
      success: true, 
      feedbackId: userFeedback.id 
    });

  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { error: 'Failed to record feedback' },
      { status: 500 }
    );
  }
}
