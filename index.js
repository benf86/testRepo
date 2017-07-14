const express = require('express');
const app = express();

const port = 8455;

app.use('/', (req, res, next) => {
  console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVV');
  console.log(req.body);
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  res.send();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
