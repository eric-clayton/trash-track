const express = require('express');
const path = require('path');
const chalk = require('chalk');

const PORT = 8080;
const app = express();

const apiRouter = require('./routes/api');
const svelteRouter = require('./routes/svelte');
const mongo = require('./db/db');

const testPoints = [
  { lat: 29.64883, lng: -82.34329 }, // century tower
  { lat: 29.64099, lng: -82.34200 }, // reitz union
  { lat: 29.63842, lng: -82.36832 }, // southwest rec
  { lat: 29.64799, lng: -82.34395 }, // marston science library
];

async function main() {
  /* Connect to Mongo server, load test points */

  await mongo.connect();
  console.log('\nSuccessfully connected to MongoDB server.');

  const db = mongo.get();
  await db.collection('coordinates').deleteMany({});
  console.log(chalk.red('Cleared test database.'));
  await db.collection('coordinates').insertMany(testPoints);
  console.log(chalk.red('Inserted test points into database.\n'));

  /* Express */

  app.use(express.json());

  app.use(svelteRouter);
  app.use(apiRouter);

  app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

  app.listen(PORT, () => {
    console.log(chalk.magenta('Booting up the Trash-Track machine... Beep Boop'));
    console.log(chalk.green('The server has started at ') + chalk.blue(`http://localhost:${PORT}`));
  });
}

try {
  main();
} catch (err) {
  console.error(err);
}
