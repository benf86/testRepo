const request = require('request-promise');
const githubRawPrefix = 'https://raw.githubusercontent.com';


const getBlog = repository =>
  request.get(`${githubRawPrefix}/${repository.full_name}/master/blog.md`);

const logBlog = (pusher, blog) =>
  console.log(`Pusher:\t${pusher}\n,Content:\n${blog}`) || ({ pusher, blog });

/* ************************************************************** */

const parsePush = ({ repository, pusher }) =>
  getBlog(repository)
  .then(logBlog.bind(null, pusher));

const handlePushNotification = (req, res, next) => {
  parsePush(JSON.parse(req.body.payload))
  .then((data) => {
    req.integratorData.blog = data;
    next();
  });
};

module.exports = {
  handlePushNotification,
};
