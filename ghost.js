const request = require('request-promise');

const handleGhUpdate = (req, res, next) => {
  console.log(JSON.stringify(req.integratorData, 0, 2));
  res.json();
};

module.exports = {
  handleGhUpdate,
};
