const request = require('request-promise');
const yaml = require('js-yaml');
const githubRawPrefix = 'https://raw.githubusercontent.com';


const getBlog = repository => Promise.all([
  request.get(`${githubRawPrefix}/${repository.full_name}/master/blog.md`),
  request.get(`${githubRawPrefix}/${repository.full_name}/master/meta.yaml`),
])
.then(([blog, meta]) => ({ blog, meta: yaml.safeLoad(meta) }));

// const logBlog = ({ blog, meta }) =>
//   console.log(`Meta: ${meta}\nContent:\n${blog}`) || ({ blog, meta });

/* ************************************************************** */

const parsePush = ({ repository }) =>
  getBlog(repository);
//  .then(logBlog);

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
