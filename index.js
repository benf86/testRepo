const express = require('express');
const bodyParser = require('body-parser');
const ghAPI = require('./github');

const port = 8455;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', ghAPI.handlePushNotification);

app.listen(port, () => console.log(`Listening on port ${port}`));
