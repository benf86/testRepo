const request = require('request-promise');
const githubRawPrefix = 'https://raw.githubusercontent.com';


const getBlog = repository =>
  request.get(`${githubRawPrefix}/${repository.full_name}/master/blog.md`);

const logBlog = (pusher, blog) =>
  console.log(pusher, blog) || ({ pusher, blog });

/* ************************************************************** */

const parsePush = ({ repository, pusher }) =>
  getBlog(repository)
  .then(logBlog.bind(null, pusher));

module.exports = {
  handlePushNotification: (req, res, next) => {
    return parsePush(JSON.parse(req.body.payload))
    .then(res.send)
    .catch(e => { debugger; res.status(500); res.send('fail'); });
  }
};
