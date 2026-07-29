const formData = new FormData();
formData.append("name", "Test");
formData.append("email", "test@test.com");
formData.append("message", "This is a test message");

fetch("http://localhost:3001/api/test-action", {
  method: "POST",
  body: formData
}).then(res => res.json()).then(data => console.log(data)).catch(console.error);
