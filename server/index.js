const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.listen(PORT, () => {
  console.log(`The server has started at http://localhost:${PORT}`);
});
