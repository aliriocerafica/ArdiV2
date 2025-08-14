// Test the search logic
const testMessage = "who are you";
const message = testMessage.toLowerCase();
console.log("Original message:", testMessage);
console.log("Lowercase message:", message);

const triggers = ['who are you', 'what is your name', 'what does ardi stand for', 'when were you created', 'who created you', 'what is your purpose', 'are you a human', 'ardi', 'who is ardi', 'what is ardi', 'ardi identity', 'ardi basic identity', 'what can ardi do', 'ardi purpose', 'ardi created', 'ardi name', 'ardi full name', 'ardi meaning', 'what ardi means'];

console.log("\nTesting triggers:");
for (const trigger of triggers) {
  const triggerLower = trigger.toLowerCase();
  const matches = message.includes(triggerLower);
  console.log(`Trigger: "${trigger}" -> "${triggerLower}" -> Matches: ${matches}`);
}

console.log("\nTesting specific cases:");
const testCases = [
  "who are you",
  "what is ardi",
  "hello",
  "hi",
  "can you help me",
  "what can you do"
];

for (const testCase of testCases) {
  const testMessage = testCase.toLowerCase();
  let found = false;
  
  for (const trigger of triggers) {
    if (testMessage.includes(trigger.toLowerCase())) {
      console.log(`"${testCase}" matches trigger "${trigger}"`);
      found = true;
      break;
    }
  }
  
  if (!found) {
    console.log(`"${testCase}" - NO MATCH FOUND`);
  }
} 