require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');

const PORT = 8080;
const app = express();

const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const svelteRouter = require('./routes/svelte');
const mongo = require('./db/db');
const pass = require('./passport');
const { Bin } = require('./db/schema/Bin');

const testPoints = [
  new Bin(29.64883, -82.34329, 0, 'joey'),   // century tower
  new Bin(29.64099, -82.34778, 0, 'ashish'), // reitz union
  new Bin(29.63842, -82.36832, 0, 'gio'),    // southwest rec
  new Bin(29.64799, -82.34395, 0, 'eric'),   // marston science library
];

async function main() {
  /* Connect to Mongo server, load test points */

  await mongo.connect();
  console.log('\nSuccessfully connected to MongoDB server.');

  const db = mongo.get();
  await db.collection('coordinates').deleteMany({});
  await db.collection('bins').deleteMany({});
  await db.collection('users').deleteMany({});
  console.log(chalk.red('Cleared database.'));
  await db.collection('bins').insertMany(testPoints);
  console.log(chalk.red('Inserted test bins into database.\n'));

  /* Initialize Passport */
  pass.init();

  /* Express */

  app.use(express.json());
  app.use(cookieSession({
    name: 'google-auth',
    keys: ['brayden', 'danny']
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(authRouter);
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
  mongo.get().shutdownServer();
  process.exit(-1);
}

process.on('SIGINT', () => {
  console.log('\nProcess interrupted, shutting down mongo server...');
  exec("mongo admin --eval 'db.shutdownServer()'");
  process.exit(0);
});
