const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const port = 8455;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVV');
  console.log(JSON.parse(req.body));
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  res.send();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
