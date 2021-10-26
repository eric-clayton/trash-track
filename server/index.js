const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

const apiRouter = require('./routes/api');
const svelteRouter = require('./routes/svelte');

app.use(express.json());

app.use(svelteRouter);
app.use(apiRouter);

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.listen(PORT, () => {
  console.log(`The server has started at http://localhost:${PORT}`);
});
