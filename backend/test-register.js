console.log('🧪 Test Registration Endpoint\n');
console.log('Run this PowerShell command to test registration:\n');

const email = "test" + Date.now() + "@example.com";

const curlCommand = `
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" \`
  -Method POST \`
  -ContentType "application/json" \`
  -Body '{"fullName":"Test User","email":"${email}","password":"password123","phone":"0712345678","location":"Westlands"}'
`;

console.log(curlCommand);
console.log('\n---\n');
console.log('Or use this curl command:\n');

const curlBash = `curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d "{\\"fullName\\":\\"Test User\\",\\"email\\":\\"${email}\\",\\"password\\":\\"password123\\",\\"phone\\":\\"0712345678\\",\\"location\\":\\"Westlands\\"}"`;

console.log(curlBash);
console.log('\n---\n');
console.log('📋 Test data:');
console.log({
  fullName: "Test User",
  email: email,
  password: "password123",
  phone: "0712345678",
  location: "Westlands"
});
