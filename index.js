const express = require('express');
const bodyParser = require('body-parser');
const ghAPI = require('./github');
const ghostAPI = require('./ghost');

const port = 8455;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.integratorData = {};
  next();
});

app.use('/', ghAPI.handlePushNotification);
app.use('/', ghostAPI.handleGhUpdate);

app.listen(port, () => console.log(`Listening on port ${port}`));
