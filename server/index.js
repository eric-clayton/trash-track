const express = require('express');
const path = require('path');
const chalk = require('chalk');
const app = express();
const PORT = 8080;

const apiRouter = require('./routes/api');
const svelteRouter = require('./routes/svelte');

app.use(express.json());

app.use(svelteRouter);
app.use(apiRouter);

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.listen(PORT, () => {
  console.log(chalk.magenta('Booting up the Trash-Track machine... Beep Boop'))
  console.log(chalk.green('The server has started at ') + chalk.blue(`http://localhost:${PORT}`));
});
