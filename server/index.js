const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const port = 1004;

app.use(express.static('dist'));

app.get('/item/:id', (req, res) => {
  db.findItem(req.params.id)
    .then(item => {
      res.status(200);
      res.send(item[0]);
    })
    .catch(err => {
      res.status(500);
      res.send('Could not retrieve images from database');
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));