// Comprehensive test for all granular knowledge entries
const testQueries = [
  // Original entries
  'What is Prop 213?',
  'What is a lien?',
  'What is UM?',
  'What is UIM?',
  'What is the difference between UM and UIM?',
  'What is a Case Manager?',
  'What is CM?',
  'How to file a leave?',
  'When did Ardent start?',
  'How did Ardent start?',
  
  // Legal terms
  'What is negligence?',
  'What is TCR?',
  'What is Med Pay?',
  'What is PIP?',
  'What is liability?',
  'What is property damage?',
  'What is pain and suffering?',
  'What is settlement?',
  'What is deposition?',
  'What is demand letter?',
  
  // Insurance terms
  'What is an adjuster?',
  'What is 1st party?',
  'What is 3rd party?',
  'What is Dec Page?',
  'What are policy limits?',
  
  // HR terms
  'What is probationary period?',
  'What is a regular employee?',
  'How much notice for resignation?',
  
  // Medical terms
  'What is medical authorization?',
  'What is a medical lien?',
  'What is an MRI?',
  
  // Legal process
  'What is discovery?',
  'What is mediation?',
  'What is arbitration?',
  
  // Abbreviations
  'What is LOR?',
  'What is EMC2?'
];

const testAPI = async (query) => {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query }),
    });

    const data = await response.json();
    const isGranular = data.source === 'Granular Knowledge';
    const status = isGranular ? '✅' : '❌';
    
    console.log(`${status} ${query}`);
    console.log(`   📊 Source: ${data.source} | Category: ${data.category}`);
    
    if (!isGranular) {
      console.log(`   ⚠️  Expected granular response but got: ${data.source}`);
    }
    
    return isGranular;
  } catch (error) {
    console.error(`❌ Error testing "${query}":`, error.message);
    return false;
  }
};

const runComprehensiveTest = async () => {
  console.log('🧪 Comprehensive Granular Knowledge Test\n');
  console.log(`Testing ${testQueries.length} queries...\n`);
  
  let granularCount = 0;
  let totalCount = 0;
  
  for (const query of testQueries) {
    const isGranular = await testAPI(query);
    if (isGranular) granularCount++;
    totalCount++;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Granular responses: ${granularCount}/${totalCount}`);
  console.log(`📈 Success rate: ${Math.round((granularCount/totalCount) * 100)}%`);
  
  if (granularCount === totalCount) {
    console.log('🎉 Perfect! All queries returned granular responses!');
  } else {
    console.log(`⚠️  ${totalCount - granularCount} queries need granular entries added.`);
  }
};

runComprehensiveTest();
