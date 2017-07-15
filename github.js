const request = require('request-promise');
const Promise = require('bluebird');

const githubRawPrefix = 'https://raw.githubusercontent.com';

function receivePushNotification (req, res, next) {
  const payload = JSON.parse(req.body.payload);
  console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVV');
  console.log(payload);
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  getBlog(res)(payload);
}

function getBlog (res) {
  return Promise.coroutine(function* requestBlogAsync ({ repository, pusher }) {
    const uri = `${githubRawPrefix}/${repository.full_name}/master/blog.md`;
    console.log(uri);
    const blog = yield request.get(uri);
    console.log(pusher.name);
    console.log(blog || 'no blog available');
    res.send(blog);
  });
}




module.exports = {
  receivePushNotification,
};
