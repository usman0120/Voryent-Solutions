fetch('http://localhost:3000/contact', {
  method: 'POST',
  headers: {
    'Next-Action': 'actionIdHere', // Actually hard to hit server action this way
    'Content-Type': 'multipart/form-data'
  }
}).then(res => console.log(res.status))
