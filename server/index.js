const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const port = 8369;

app.use(express.static('dist'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/item', (req, res) => {
  db.findItem(req.query.id)
    .then(item => {
      res.status(200).send(item[0]);
    })
    .catch(err => {
      res.status(500).send('Could not retrieve images from database');
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));