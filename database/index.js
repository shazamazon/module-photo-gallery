const mongoose = require('mongoose');
const data = require('./data.js');
const { password } = require('./config.js');

const URI = `mongodb+srv://kimjulia313:${password}@fec-photo-gallery-qoswz.mongodb.net/shazamazon?retryWrites=true&w=majority`;

mongoose.connect(URI, {useNewUrlParser: true});

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

const findItem = (id) => {
  return media.find({ ProductId: id });
};

module.exports = { db, findItem };