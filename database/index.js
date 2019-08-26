const mongoose = require('mongoose');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/shazamazon', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to database'));

const mediaSchema = new mongoose.Schema({
  ProductId: Number,
  ItemName: String,
  Photo: Array,
  Video: String
}, {collection: 'media'});

const media = mongoose.model('media', mediaSchema);

const seedDatabase = () => {
  media.collection.insertMany(data, (err, docs) => {
    if (err) {
      return console.error(err);
    } else {
      console.log('Multiple documents inserted');
    }
  });
};

const findItem = (name, query, callback) => {
  db.db.collection(name, (err, collection) => {
    collection.find(query).toArray(callback);
  });
};

module.exports = { db, seedDatabase, findItem };