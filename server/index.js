const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const port = 1004;

app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));