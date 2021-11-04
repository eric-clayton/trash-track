const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

function connect() {
  client.connect()
    .then((_res, err) => {

      return new Promise((resolve, reject) => {

        if (err) reject(err);
        else resolve();

      });

    });
}

function get() {
  return client.db("trash-track");
}

function close() {
  client.close();
}

exports.connect = connect;
exports.get = get;
exports.close = close;
