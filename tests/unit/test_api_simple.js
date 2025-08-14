// Simple test script for the API - Testing Granular Knowledge
const testQueries = [
  'What is Prop 213?',
  'What is a lien?',
  'What is UM?',
  'What is UIM?',
  'What is the difference between UM and UIM?',
  'What is a Case Manager?',
  'What is CM?',
  'How to file a leave?',
  'When did Ardent start?',
  'How did Ardent start?'
];

const testAPI = async (query) => {
  try {
    console.log(`\n🔍 Testing: "${query}"`);
    console.log('='.repeat(50));
    
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }

    const data = await response.json();
    console.log(`📊 Source: ${data.source || 'N/A'}`);
    console.log(`📂 Category: ${data.category || 'N/A'}`);
    console.log(`\n💬 Response:\n${data.response}`);
    console.log('\n' + '='.repeat(50));
  } catch (error) {
    console.error('Error testing API:', error);
  }
};

const runAllTests = async () => {
  console.log('🚀 Testing Granular Knowledge System...\n');
  
  for (const query of testQueries) {
    await testAPI(query);
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n✅ All tests completed!');
};

runAllTests();
