const axios = require('axios');

// Test the API endpoints
async function testAPI() {
  try {
    console.log('Testing root endpoint...');
    const rootResponse = await axios.get('http://localhost:3000/');
    console.log('Root endpoint response:', rootResponse.data);
    
    console.log('\nTesting /countries endpoint...');
    const countriesResponse = await axios.get('http://localhost:3000/countries');
    console.log(`Received ${countriesResponse.data.length} countries`);
    console.log('First country:', countriesResponse.data[0]);
    
    console.log('\nAPI tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();