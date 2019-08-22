const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shazamazon', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to database'));

const findItem = (name, query, callback) => {
  db.db.collection(name, (err, collection) => {
    collection.find(query).toArray(callback);
  });
};

module.exports = { db, findItem };