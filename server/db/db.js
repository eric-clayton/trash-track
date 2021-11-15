const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function connect() {
  await client.connect();
}

function get() {
  return client.db('trash-track');
}

function close() {
  client.close();
}

exports.connect = connect;
exports.get = get;
exports.close = close;
