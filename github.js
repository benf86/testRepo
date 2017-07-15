const request = require('request-promise');
const githubRawPrefix = 'https://raw.githubusercontent.com';


const getBlog = repository => Promise.all([
  request.get(`${githubRawPrefix}/${repository.full_name}/master/blog.md`),
  request.get(`${githubRawPrefix}/${repository.full_name}/master/meta.yaml`),
])
.spread((blog, meta) => ({ blog, meta }));

const logBlog = (pusher, { blog, meta }) =>
  console.log(`Pusher:\n${JSON.stringify(pusher, 0, 2)}\nMeta: ${meta}\nContent:\n${blog}`) || ({ pusher, blog, meta });

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
