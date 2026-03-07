async function test() {
  const response = await fetch('http://localhost:5000/api/test', { method: 'POST' });
  const data = await response.json();
  console.log(data);
}
test();
