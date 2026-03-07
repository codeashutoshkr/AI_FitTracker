async function getToken() {
  try {
    const res = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser_1772824941616',
        password: 'password123'
      })
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data.token);
    } else {
      console.error(data);
    }
  } catch (error) {
    console.error(error.message);
  }
}

getToken();
