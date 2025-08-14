# Custom AI Model Integration Guide

This guide will help you integrate your trained AI model into the Ardi system.

## 🚀 Quick Start

Your project is now prepared for custom AI model integration! The redundant knowledge files have been removed, and a clean structure is ready for your AI model.

## 📁 Current Structure

### Core Files Retained:
- `lib/ardiIdentity.ts` - Basic Ardi identity responses
- `lib/contentFilter.ts` - Content safety filtering
- `lib/knowledgeIndex.ts` - Simplified knowledge routing
- `lib/utils.ts` - Utility functions

### New Integration Files:
- `lib/customAIModel.ts` - Your AI model interface and implementation
- `app/api/chat/route.ts` - Main chat API with AI model integration
- `app/api/chat-custom/route.ts` - Dedicated custom AI model endpoint

## 🔧 Integration Steps

### 1. Configure Your AI Model

Edit `lib/customAIModel.ts` and update the `CustomAIModelImplementation` class:

```typescript
async generateResponse(message: string, config?: AIModelConfig): Promise<AIResponse> {
  // Replace this section with your AI model's API call
  const response = await fetch('YOUR_AI_MODEL_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config?.apiKey}`,
    },
    body: JSON.stringify({
      prompt: this.buildPrompt(message, config),
      temperature: config?.temperature,
      max_tokens: config?.maxTokens,
      // Add your model-specific parameters
    }),
  });

  const result = await response.json();
  
  return {
    content: result.choices[0].text || result.content,
    confidence: result.confidence || 0.8,
    tokensUsed: result.usage?.total_tokens || 0,
    processingTime: result.processingTime || 0,
    category: this.categorizeResponse(message),
    metadata: result.metadata || {}
  };
}

isAvailable(): boolean {
  return true; // Set to true when your model is configured
}
```

### 2. Add Your API Configuration

Update the `DEFAULT_AI_CONFIG` in `lib/customAIModel.ts`:

```typescript
export const DEFAULT_AI_CONFIG: AIModelConfig = {
  temperature: 0.7,
  maxTokens: 1000,
  apiKey: process.env.YOUR_AI_MODEL_API_KEY,
  endpoint: process.env.YOUR_AI_MODEL_ENDPOINT,
  model: 'your-model-name',
  context: {
    role: 'legal_assistant',
    company: 'Ardent Paralegal Business Solutions',
    capabilities: [
      'case_management',
      'legal_research', 
      'document_organization',
      'client_communication',
      'paralegal_services',
      'intake_processing',
      'insurance_guidance',
      'treatment_planning'
    ]
  }
};
```

### 3. Environment Variables

Add your API credentials to `.env.local`:

```bash
YOUR_AI_MODEL_API_KEY=your_api_key_here
YOUR_AI_MODEL_ENDPOINT=https://your-ai-model-endpoint.com/api/generate
```

### 4. Test the Integration

#### Using the Main Chat API (`/api/chat`):
- Handles basic Ardi identity questions with built-in knowledge
- Falls back to your custom AI model for complex queries
- Provides content filtering and safety checks

#### Using the Custom AI API (`/api/chat-custom`):
- Dedicated endpoint for your custom AI model
- More control over AI model parameters
- Direct access to your trained model

## 🎯 API Endpoints

### Main Chat API: `/api/chat`
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: "How do I manage a personal injury case?" })
});
```

### Custom AI API: `/api/chat-custom`
```javascript
const response = await fetch('/api/chat-custom', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Help me draft a demand letter",
    options: {
      temperature: 0.8,
      maxTokens: 1500,
      context: { specialization: 'personal_injury' }
    }
  })
});
```

## 🛡️ Built-in Features

### Content Filtering
- Automatic profanity and inappropriate content detection
- Professional responses for filtered content
- Configurable severity levels

### Basic Knowledge Fallback
- Ardi identity questions (who are you, what's your name, etc.)
- System information and capabilities
- Company information

### Error Handling
- Graceful fallbacks when AI model is unavailable
- Comprehensive error logging
- User-friendly error messages

## 🔍 Testing Your Integration

### 1. Check Model Status
```bash
curl http://localhost:3000/api/chat
curl http://localhost:3000/api/chat-custom
```

### 2. Test Basic Functionality
```bash
# Test identity questions (should use basic knowledge)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Who are you?"}'

# Test complex questions (should use your AI model)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I calculate damages in a personal injury case?"}'
```

### 3. Verify Content Filtering
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "This contains inappropriate content"}'
```

## 📊 Response Format

Your AI model responses will follow this structure:

```json
{
  "response": "AI generated content here",
  "source": "Custom AI Model",
  "category": "Legal",
  "confidence": 0.85,
  "tokens_used": 150,
  "processing_time": 1200,
  "handledBy": "custom_ai_model",
  "modelInfo": {
    "name": "Your Custom AI Model",
    "version": "1.0.0",
    "capabilities": ["case_management", "legal_research", ...]
  }
}
```

## 🎛️ Customization Options

### Model Parameters
- `temperature`: Control randomness (0.0 - 1.0)
- `maxTokens`: Maximum response length
- `context`: Additional context for your model

### Response Categories
Customize the `categorizeResponse` method to match your use cases:
- Legal
- Documentation  
- Client Relations
- Process Management
- General

## 🚨 Important Notes

1. **Security**: Never commit API keys to version control
2. **Rate Limiting**: Implement rate limiting for production use
3. **Monitoring**: Add logging and monitoring for your AI model calls
4. **Fallbacks**: Always provide fallback responses for when your model is unavailable

## 📞 Support

If you need help with the integration:
- Check the console for error messages
- Review the API response status codes
- Test with the health check endpoints
- Ensure your AI model endpoint is accessible

## 🎉 You're Ready!

Once you've completed these steps, your custom AI model will be fully integrated with the Ardi system, handling complex legal queries while maintaining the basic identity and safety features.
