async function testHealth() {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const text = await response.text();
    console.log('Health Response:', text);
  } catch (error) {
    console.log('Health Request Error:', error.message);
  }
}
testHealth();
