// Test new granular knowledge entries
const testQueries = [
  'What is negligence?',
  'What is TCR?',
  'What is Med Pay?',
  'What is PIP?',
  'What is liability?',
  'What is property damage?',
  'What is pain and suffering?'
];

const testAPI = async (query) => {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query }),
    });

    const data = await response.json();
    console.log(`\n📋 Q: ${query}`);
    console.log(`📊 Source: ${data.source}`);
    console.log(`📂 Category: ${data.category}`);
    console.log(`💬 Response: ${data.response.substring(0, 120)}...`);
  } catch (error) {
    console.error('Error:', error);
  }
};

const runTests = async () => {
  console.log('🧪 Testing New Granular Knowledge Entries...\n');
  for (const query of testQueries) {
    await testAPI(query);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  console.log('\n✅ Tests completed!');
};

runTests();
