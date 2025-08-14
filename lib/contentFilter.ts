// Content Filtering System for ARDI
export interface ContentFilterResult {
  isInappropriate: boolean;
  reason?: string;
  severity: 'low' | 'medium' | 'high';
  suggestedResponse?: string;
}

// Inappropriate language patterns (case-insensitive)
const inappropriatePatterns = {
  profanity: [
    // Common profanity
    /\b(fuck|shit|bitch|ass|damn|hell|piss|crap|dick|cock|pussy|cunt|whore|slut)\b/gi,
    // Variations and common misspellings
    /\b(f\*ck|f\*\*k|sh\*t|b\*tch|a\*s|d\*mn|h\*ll|p\*ss|cr\*p|d\*ck|c\*ck|p\*ssy|c\*nt|wh\*re|sl\*t)\b/gi,
    // Common abbreviations
    /\b(fk|st|btch|as|dm|hl|ps|cp|dk|ck|pssy|cnt|whr|slt)\b/gi,
    // Additional variations
    /\b(f\*\*\*|s\*\*\*|b\*\*\*\*|a\*\*|d\*\*\*|h\*\*\*|p\*\*\*|c\*\*\*|d\*\*\*|c\*\*\*|p\*\*\*\*|c\*\*\*|w\*\*\*\*|s\*\*\*)\b/gi,
    // Common misspellings and substitutions
    /\b(fuk|fukc|fck|shyt|sh1t|b1tch|b!tch|a$$|a55|d@mn|h3ll|p!ss|cr@p|d!ck|c0ck|p*ssy|c*nt|wh0re|sl*t)\b/gi,
  ],
  threats: [
    /\b(kill|murder|death|suicide|harm|hurt|attack|fight|violence|weapon|gun|knife|bomb)\b/gi,
    /\b(threat|intimidate|bully|harass|stalk|abuse|assault|rape|molest)\b/gi,
  ],
  hate: [
    /\b(nazi|hitler|racist|bigot|homophobe|transphobe|sexist|misogynist)\b/gi,
    /\b(hate|despise|loathe|abhor|detest)\s+(black|white|jew|muslim|gay|lesbian|trans|woman|man)\b/gi,
  ],
  harassment: [
    /\b(stalk|harass|bully|intimidate|threaten|abuse|assault)\b/gi,
    /\b(creep|pervert|pedo|pedophile|groom|grooming)\b/gi,
  ]
};

// Professional responses for different severity levels
const professionalResponses = {
  low: [
    "I am not developed to respond on that kind of behavior. I'm here to help with legal case management questions. How can I assist you with your case today?",
    "I am not developed to respond on that kind of behavior. I'm designed to help with legal operations and case management. Is there a specific legal question I can help you with?",
    "I am not developed to respond on that kind of behavior. Let's focus on how I can help with your legal case management needs. What would you like to know about case organization or workflow optimization?",
    "I am not developed to respond on that kind of behavior. I'm here to provide professional legal assistance. How can I help you with your case management needs today?",
    "I am not developed to respond on that kind of behavior. Let's work together on your legal case management. What specific questions do you have about case organization or workflow optimization?"
  ],
  medium: [
    "I am not developed to respond on that kind of behavior. I'm here to provide professional legal case management assistance. I'd be happy to help you with any questions about case organization, document management, or legal workflows.",
    "I am not developed to respond on that kind of behavior. As a professional legal AI assistant, I'm designed to help with case management and legal operations. How can I assist you with your legal practice today?",
    "I am not developed to respond on that kind of behavior. I understand you may have concerns, but I'm focused on helping with legal case management. What specific legal workflow questions do you have?",
    "I am not developed to respond on that kind of behavior. I'm a professional legal assistant designed to help with case management. How can I assist you with your legal operations today?",
    "I am not developed to respond on that kind of behavior. Let's maintain a professional environment while I help you with your legal case management needs. What questions do you have?"
  ],
  high: [
    "I am not developed to respond on that kind of behavior. I'm a professional legal case management assistant designed to help with legal operations. I cannot engage with inappropriate language or behavior. How can I help you with your legal case management needs?",
    "I am not developed to respond on that kind of behavior. As a professional AI assistant for legal case management, I must maintain appropriate standards. I'm here to help with case organization, document management, and legal workflows. What legal questions can I assist you with?",
    "I am not developed to respond on that kind of behavior. I'm designed to provide professional legal case management support. I cannot respond to inappropriate language. How can I help you with your legal practice management needs?",
    "I am not developed to respond on that kind of behavior. I'm a professional legal assistant and must maintain appropriate standards. I'm here to help with case management and legal operations. How can I assist you professionally?",
    "I am not developed to respond on that kind of behavior. As a professional AI assistant, I cannot engage with inappropriate content. I'm here to help with legal case management. How can I assist you with your legal needs?"
  ]
};

export function filterContent(message: string): ContentFilterResult {
  const lowerMessage = message.toLowerCase();
  let severity: 'low' | 'medium' | 'high' = 'low';
  let detectedIssues: string[] = [];
  
  // Check for inappropriate patterns
  for (const [category, patterns] of Object.entries(inappropriatePatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(lowerMessage)) {
        detectedIssues.push(category);
        
        // Determine severity based on category and frequency
        if (category === 'threats' || category === 'hate' || category === 'harassment') {
          severity = 'high';
        } else if (category === 'profanity') {
          // Count profanity instances to determine severity
          const matches = lowerMessage.match(pattern);
          if (matches && matches.length > 2) {
            severity = 'medium';
          } else {
            severity = 'low';
          }
        }
      }
    }
  }
  
  // Check for excessive caps (shouting)
  const capsRatio = (lowerMessage.match(/[A-Z]/g) || []).length / lowerMessage.length;
  if (capsRatio > 0.7 && lowerMessage.length > 10) {
    detectedIssues.push('excessive_caps');
    if (severity === 'low') severity = 'medium';
  }
  
  // Check for repeated characters (spam-like behavior)
  const repeatedChars = lowerMessage.match(/(.)\1{4,}/g);
  if (repeatedChars && repeatedChars.length > 0) {
    detectedIssues.push('repeated_characters');
    if (severity === 'low') severity = 'medium';
  }
  
  const isInappropriate = detectedIssues.length > 0;
  
  if (isInappropriate) {
    const responses = professionalResponses[severity];
    const suggestedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      isInappropriate: true,
      reason: `Detected ${detectedIssues.join(', ')}`,
      severity,
      suggestedResponse
    };
  }
  
  return {
    isInappropriate: false,
    severity: 'low'
  };
}

// Additional helper function to check if message should be ignored entirely
export function shouldIgnoreMessage(message: string): boolean {
  const filterResult = filterContent(message);
  return filterResult.isInappropriate && filterResult.severity === 'high';
}

// Function to get appropriate response based on severity
export function getAppropriateResponse(severity: 'low' | 'medium' | 'high'): string {
  const responses = professionalResponses[severity];
  return responses[Math.floor(Math.random() * responses.length)];
} 