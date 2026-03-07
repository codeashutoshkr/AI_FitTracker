async function testSignup() {
  const username = 'testuser_' + Date.now();
  const password = 'password123';
  
  try {
    const response = await fetch('http://127.0.0.1:5001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const text = await response.text();
    console.log('Status Code:', response.status);
    console.log('Raw Response:', text);
  } catch (error) {
    console.log('Request Error:', error.message);
  }
}

testSignup();
