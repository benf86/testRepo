const config = require('./config');
const request = require('request-promise');


const login = () => request({
  method: 'POST',
  uri: `${config.ghost.api}/authentication/token`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: {
    grant_type: 'password',
    username: config.ghost.username,
    password: config.ghost.password,
    client_id: config.ghost.clientId,
    client_secret: config.ghost.clientSecret,
  },
});


const handleGhUpdate = (req, res, next) => {
  console.log(JSON.stringify(req.integratorData, 0, 2));
  console.log('Doing Ghost call...');

  login()
  .then(bearer => console.log(`Bearer: ${bearer}`))
  .then(res.json());
};

module.exports = {
  handleGhUpdate,
};
