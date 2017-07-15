const request = require('request-promise');
const githubRawPrefix = 'https://raw.githubusercontent.com';


const getBlog = repository =>
request.get(`${githubRawPrefix}/${repository.full_name}/master/blog.md`);

const logBlog = (pusher, blog) => console.log(blog);

/* ************************************************************** */

const parsePush = ({ repository, pusher }) =>
  getBlog(repository)
  .tap(logBlog.bind(null, pusher))
  .return({ repository, pusher });

module.exports = {
  handlePushNotification: (req, res, next) => parsePush(JSON.parse(req.body.payload)).then(res.send),
};
