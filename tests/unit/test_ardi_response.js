// Test the getArdiResponse logic
function testArdiResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  console.log(`Testing: "${userMessage}"`);
  console.log(`Lowercase: "${message}"`);
  
  // Simulate knowledge base check
  const knowledgeResult = null; // Simulate no knowledge base match
  
  if (knowledgeResult) {
    console.log("✅ Found in knowledge base");
    return;
  }
  
  // Check for greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
      message.includes('good morning') || message.includes('good afternoon') || 
      message.includes('good evening') || message.includes('howdy') || message.includes('greetings')) {
    console.log("✅ Matched greeting condition");
    return;
  }
  
  // Check for help questions
  if (message.includes('help') || message.includes('support') || message.includes('assistance') || 
      message.includes('how can you help') || message.includes('what can you do') || 
      message.includes('capabilities') || message.includes('features')) {
    console.log("✅ Matched help condition");
    return;
  }
  
  // Check for about questions
  if (message.includes('what are you') || message.includes('who are you') || 
      message.includes('about ardi') || message.includes('what is ardi') || 
      message.includes('tell me about yourself') || message.includes('introduce yourself')) {
    console.log("✅ Matched about condition");
    return;
  }
  
  // Check for acknowledgment responses
  if (message.includes('okay') || message.includes('ok') || message.includes('alright') || message.includes('got it') || 
      message.includes('thank you') || message.includes('thanks') || message.includes('appreciate') ||
      message.includes('thats nice') || message.includes('that\'s nice') || message.includes('sounds good') || 
      message.includes('perfect') || message.includes('great') || message.includes('awesome') || 
      message.includes('cool') || message.includes('nice') || message.includes('good to know') ||
      message === 'yes' || message === 'no' || message.includes('i see') || message.includes('understood')) {
    console.log("✅ Matched acknowledgment condition");
    return;
  }
  
  // Check for brief responses
  if (message.trim().length <= 10 && (message.includes('yep') || message.includes('yeah') || 
      message.includes('sure') || message.includes('right') || message.includes('indeed') ||
      message === 'ok' || message === 'okay' || message === 'yes' || message === 'no')) {
    console.log("✅ Matched brief response condition");
    return;
  }
  
  // Check for general interest
  if (message.includes('interesting') || message.includes('tell me more') || 
      message.includes('sounds good') || message.includes('impressive') || 
      message.includes('learn more') || message.includes('more information')) {
    console.log("✅ Matched general interest condition");
    return;
  }
  
  console.log("❌ No specific condition matched - should use default response");
}

// Test cases
const testCases = [
  "hello",
  "hi",
  "who are you",
  "what is ardi",
  "can you help me",
  "what can you do",
  "help",
  "ok",
  "yes",
  "no",
  "thank you",
  "interesting",
  "random question that doesn't match anything"
];

console.log("Testing Ardi Response Logic:\n");
for (const testCase of testCases) {
  testArdiResponse(testCase);
  console.log("---");
} 