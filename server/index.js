const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const port = 1004;

app.use(express.static('dist'));

app.get('/items', (req, res) => {
  db.getOneItem('media', {'productName': 'Harry Potter\'s Wand'}, (err, docs) => {
    if (err) {
      return err;
    }
    res.send(docs);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));