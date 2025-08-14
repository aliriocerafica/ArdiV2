import { NextRequest, NextResponse } from 'next/server';
import { findKnowledge } from '../../../lib/knowledgeIndex';
import { isEnhancedModeEnabled, shouldUseThinkingEngine } from '../../../lib/enhancedConfig';

// Enhanced features - only imported if enabled
let thinkingEngine: any = null;
let learningSystem: any = null;

// Dynamically import enhanced features when needed
async function getEnhancedModules() {
  if (!thinkingEngine) {
    const { thinkingEngine: te } = await import('../../../lib/thinkingEngine');
    const { learningSystem: ls } = await import('../../../lib/learningSystem');
    thinkingEngine = te;
    learningSystem = ls;
  }
  return { thinkingEngine, learningSystem };
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

    // Basic content filtering - check for obviously inappropriate content
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
      });
    }

    const userMessage = message.toLowerCase();
    
    // Check if enhanced mode is enabled for this query
    const useEnhanced = isEnhancedModeEnabled() && shouldUseThinkingEngine();
    
    if (useEnhanced) {
      try {
        // Use enhanced thinking engine processing
        const { thinkingEngine: te, learningSystem: ls } = await getEnhancedModules();
        const startTime = Date.now();
        
        const thinkingResult = await te.processQuery(message);
        const responseTime = Date.now() - startTime;
        
        // Record interaction for learning
        ls.recordInteraction(
          thinkingResult.thinkingProcess,
          thinkingResult.response,
          responseTime,
          thinkingResult.thinkingProcess.confidence > 0.6
        );
        
        // Return enhanced response with metadata
        return NextResponse.json({
          response: thinkingResult.response,
          source: thinkingResult.isEnhanced ? 'AI Enhanced Response' : 'Knowledge Base',
          category: 'Enhanced Processing',
          isEnhanced: true,
          confidence: thinkingResult.thinkingProcess.confidence,
          analysisSteps: thinkingResult.thinkingProcess.analysisSteps
        });
        
      } catch (enhancedError) {
        console.warn('Enhanced processing failed, falling back to standard:', enhancedError);
        // Fall through to standard processing
      }
    }
    
    // Handle Case Manager Assistant (CMA) definition questions (NOT training)
    if ((userMessage.includes('what is') && (userMessage.includes('cma') || userMessage.includes('case manager assistant'))) ||
        (userMessage.includes('cma') && (userMessage.includes('job') || userMessage.includes('role') || userMessage.includes('responsibilities'))) ||
        (userMessage.includes('case manager assistant') && (userMessage.includes('job') || userMessage.includes('role') || userMessage.includes('responsibilities'))) ||
        (userMessage.includes('what does') && (userMessage.includes('cma do') || userMessage.includes('case manager assistant do'))) ||
        userMessage.includes('cma job') || userMessage.includes('case manager assistant job')) {
      
      // Exclude training-related queries from this handler
      if (userMessage.includes('training') || userMessage.includes('how long') || userMessage.includes('duration')) {
        // Let training handler take priority - fall through
      } else {
        return NextResponse.json({
          response: "👥 **Case Manager Assistant (CMA)**\n\nCase Manager Assistant jobs involve providing administrative and technical support to case managers, assisting with client communication, and maintaining case files and records. These roles are found in various settings like healthcare, social services, and legal fields.\n\n📋 **Key Responsibilities:**\n• **Administrative Support** - Providing comprehensive support to case managers\n• **Technical Assistance** - Helping with case management systems and processes\n• **Client Communication** - Facilitating communication between clients and case managers\n• **File Management** - Maintaining accurate case files and records\n• **Documentation** - Ensuring proper documentation of case activities\n\n🏢 **Work Settings:**\n• **Healthcare** - Hospitals, clinics, and medical facilities\n• **Social Services** - Community organizations and government agencies\n• **Legal Fields** - Law firms and legal service providers\n• **Insurance** - Claims processing and client support\n• **Non-profit Organizations** - Various client support services\n\n💼 **Skills Required:**\n• Strong organizational and communication skills\n• Attention to detail and accuracy\n• Proficiency with case management software\n• Understanding of confidentiality requirements\n• Ability to work with diverse client populations\n\n⏰ **Training Period at Ardent:** 1-3 weeks\n\nCMAs play a vital role in ensuring smooth case management operations and excellent client service across various industries.",
          source: "Role Information",
          category: "Job Descriptions"
        });
      }
    }

    // Handle training-related queries with improved pattern matching
    if (userMessage.includes('training period') || 
        (userMessage.includes('how long') && userMessage.includes('training')) || 
        userMessage.includes('training duration') || 
        userMessage.includes('training last') ||
        (userMessage.includes('training') && (userMessage.includes('cma') || userMessage.includes('case manager assistant') || 
         userMessage.includes('hr') || userMessage.includes('human resources') || 
         userMessage.includes('case management') || userMessage.includes('case manager') ||
         userMessage.includes('medical records') || userMessage.includes('manager') ||
         userMessage.includes('cm'))) ||
        userMessage.trim() === 'training') {
      return NextResponse.json({
        response: "⏰ **Training Periods by Role**\n\nTraining duration varies based on the position and client account requirements:\n\n👥 **Case Manager Assistants (CMA)**\n• **Duration**: 1-3 weeks\n• **Coverage**: Comprehensive training on case management workflows and legal procedures\n• **Focus**: Client communication, document organization, deadline tracking\n\n👤 **Human Resources (HR)**\n• **Duration**: 1-2 weeks\n• **Coverage**: HR policies, employee relations, compliance requirements\n• **Focus**: Employment law, benefits administration, conflict resolution\n\n🏥 **Medical Records**\n• **Duration**: 1-3 weeks\n• **Coverage**: HIPAA compliance, medical documentation handling, record management systems\n• **Focus**: Privacy protocols, medical terminology, documentation accuracy\n\n🗣️ **Speak Easy Account**\n• **Duration**: 1 day\n• **Coverage**: Account-specific procedures and communication protocols\n• **Focus**: Quick onboarding for streamlined processes\n\n⚖️ **BDJ Account**\n• **Duration**: Depends on the specific role\n• **Coverage**: Role-specific training tailored to position requirements\n• **Focus**: Customized based on job responsibilities\n\n📚 **Training Components Include:**\n• Role-specific procedures and protocols\n• Software and system training\n• Client communication standards\n• Quality assurance requirements\n• Account-specific workflows\n• Ongoing support and mentorship\n\nAll training programs include hands-on practice, assessment, and ongoing support to ensure success in your role.",
        source: "Training Information",
        category: "Training Periods"
      });
    }

    // Standard knowledge base processing (original functionality)
    const knowledgeResult = findKnowledge(message);
    if (knowledgeResult) {
      // Prioritize table content if available, otherwise use regular content
      return NextResponse.json({
        response: knowledgeResult.tableContent || knowledgeResult.content,
        source: knowledgeResult.source,
        category: knowledgeResult.category
      });
    }

    // Handle specific "Hello Ardi" greetings
    if (userMessage.includes('hello ardi') || userMessage.includes('hello ard') || 
        userMessage.includes('hi ardi') || userMessage.includes('hey ardi')) {
      return NextResponse.json({
        response: "👋 Hi, I'm Ardi!\n\nI'm ARDI, which stands for Ardent Knowledge Database Intelligence. I'm an AI assistant specifically designed to help legal professionals with case management and paralegal services. My purpose is to provide you with comprehensive support for legal workflows, document organization, deadline tracking, and client communication optimization. I work with Ardent Paralegal Business Solutions Inc to make your legal operations more efficient and organized. I'm here to assist you with any questions about case management, legal processes, or our services.\n\nWhat can I assist you with today? 😊"
      });
    }

    // Handle general greetings
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey') || 
        userMessage.includes('good morning') || userMessage.includes('good afternoon') || 
        userMessage.includes('good evening') || userMessage.includes('howdy') || userMessage.includes('greetings')) {
      const greetingResponses = [
        "## 👋 Hi, I'm Ardi!\n\nI'm ARDI, which stands for Ardent Knowledge Database Intelligence. I'm an AI assistant specifically designed to help legal professionals with case management and paralegal services. My purpose is to provide you with comprehensive support for legal workflows, document organization, deadline tracking, and client communication optimization. I work with Ardent Paralegal Business Solutions Inc to make your legal operations more efficient and organized. I'm here to assist you with any questions about case management, legal processes, or our services.\n\n### What can I assist you with today? 😊",
        "## 🌟 Hi, I'm Ardi!\n\nI'm ARDI - Ardent Knowledge Database Intelligence. I'm your AI companion for legal excellence, created to help legal professionals streamline their case management processes. My role is to provide intelligent support for document organization, deadline tracking, client communications, and workflow optimization. I combine advanced AI capabilities with deep knowledge of legal processes to help you manage cases more effectively. Whether you need help with case organization, legal research, or client communication, I'm here to support your legal operations.\n\n### How can I support your legal operations today?"
      ];
      return NextResponse.json({
        response: greetingResponses[Math.floor(Math.random() * greetingResponses.length)]
      });
    }

    // Handle ARDI acronym questions
    if (userMessage.includes('what does ardi stand for') || userMessage.includes('what is ardi stands for') || 
        userMessage.includes('ardi stands for') || userMessage.includes('what does ardi mean') || 
        userMessage.includes('ardi acronym') || userMessage.includes('ardi abbreviation') || 
        userMessage.includes('meaning of ardi')) {
      return NextResponse.json({
        response: "🤖 **ARDI** represents **Ardent Knowledge Database Intelligence** - a sophisticated second-generation AI assistant specifically engineered for legal professionals and case management excellence. As the embodiment of passionate dedication to legal excellence, I combine comprehensive knowledge mastery with advanced information management capabilities to provide AI-powered decision support and automated workflow optimization. My architecture focuses on legal operations optimization through seamless workflow automation, offering advanced document analysis, deadline tracking, and client communication capabilities. I excel in case lifecycle management, document categorization and retrieval, deadline tracking with automated alerts, and client communication optimization, all while maintaining attorney-client privilege protection, HIPAA compliance for healthcare matters, state bar requirement adherence, and enterprise-grade data security. My mission is to transform legal practice through intelligent automation, comprehensive knowledge management, and unwavering commitment to operational excellence. As Version 2, I represent months of development focused on real-world legal professional feedback and am designed to be your indispensable partner in achieving legal operational excellence!"
      });
    }

    // Handle company and services questions
    if (userMessage.includes('ardent') || userMessage.includes('paralegal') || userMessage.includes('services') || 
        userMessage.includes('company') || userMessage.includes('business solutions') || 
        userMessage.includes('about the company') || userMessage.includes('your company')) {
      return NextResponse.json({
        response: "🏢 Ardent Paralegal Business Solutions Inc is a premier legal services company dedicated to revolutionizing how law firms operate through intelligent case management and comprehensive paralegal support.\n\n🎯 **Our Mission:**\nTo empower legal professionals with cutting-edge technology and expert paralegal services that enhance efficiency, improve client satisfaction, and drive business growth.\n\n⭐ **Core Services:**\n• **Case Management Excellence** - End-to-end case lifecycle management\n• **Document Management** - Advanced organization and retrieval systems\n• **Paralegal Support** - Certified paralegal professionals\n• **Workflow Optimization** - Process improvement and automation\n• **Client Communication** - Professional client relationship management\n• **Legal Research Support** - Comprehensive research assistance\n• **Compliance Management** - Regulatory and ethical compliance monitoring\n\n🚀 **What Sets Us Apart:**\n• AI-powered solutions (like me!) that learn and adapt\n• Experienced paralegal professionals with diverse expertise\n• Customizable solutions for firms of all sizes\n• 24/7 support and system monitoring\n• Proven track record of improving firm efficiency by 40%+\n• HIPAA and attorney-client privilege compliant systems\n\n💼 **Industries We Serve:**\n• Personal Injury Law\n• Corporate Law\n• Family Law\n• Criminal Defense\n• Real Estate Law\n• Employment Law\n• Immigration Law\n\nWould you like to learn more about how we can specifically help your practice area?"
      });
    }

    // Handle help and support questions
    if (userMessage.includes('help') || userMessage.includes('support') || userMessage.includes('assistance') || 
        userMessage.includes('how can you help') || userMessage.includes('what can you do') || 
        userMessage.includes('capabilities') || userMessage.includes('features')) {
      return NextResponse.json({
        response: "🤝 I'm here to provide comprehensive support for all your legal operations needs! As ARDI Version 2, I offer extensive capabilities designed to transform your legal practice.\n\n🛠️ **How I Can Help You:**\n\n**📋 Case Management:**\n• Organize and track cases from intake to resolution\n• Automate workflow processes and task assignments\n• Monitor case progress and generate reports\n\n**📄 Document Management:**\n• Intelligent document organization and categorization\n• Template creation and management\n• Version control and collaboration tools\n\n**⏰ Schedule & Deadline Management:**\n• Critical date tracking with automated reminders\n• Court calendar integration\n• Conflict checking and resolution\n\n**👥 Client Relations:**\n• Communication templates and automation\n• Client portal management\n• Satisfaction tracking and improvement\n\n**💡 Strategic Guidance:**\n• Workflow optimization recommendations\n• Best practice implementation\n• Technology integration planning\n• Efficiency improvement strategies\n\n**📊 Analytics & Reporting:**\n• Performance metrics and insights\n• Financial analysis and projections\n• Productivity measurements\n\n🎯 **Getting Started:**\nSimply tell me about your specific challenges or goals, and I'll provide tailored recommendations and step-by-step guidance. Whether you're looking to implement new systems or optimize existing processes, I'm here to help!\n\nWhat area would you like to focus on first?"
      });
    }

    // Handle unknown questions with better response
    return NextResponse.json({
      response: "📚 **Knowledge Base Update Request**\n\nI apologize, but I don't currently have information about that specific topic in my knowledge base. As of now, that is not on our knowledge base.\n\n**🔧 How to Get Help:**\nPlease message our IT team for that so they can add it to my knowledge base. This will help me provide you with accurate and helpful information in the future.\n\n**📞 Contact Information:**\n• **IT Support**: Please reach out to our technical team\n• **Subject**: Knowledge Base Addition Request\n• **Include**: Your specific question or topic\n\n**💡 In the meantime, you can:**\n• Try asking a different question from my available topics\n• Type `/Questions` to see all available questions I can answer\n• Contact our support team for immediate assistance\n\nI'm constantly learning and expanding my knowledge base to better serve you!"
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
