const request = require('request-promise');
const Promise = require('bluebird');

const githubRawPrefix = 'https://raw.githubusercontent.com';

function receivePushNotification (req, res, next) {
  const payload = JSON.parse(req.body.payload);
  console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVV');
  console.log(payload);
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  getBlog(res)(payload.repository.full_name);
}

function getBlog (res) {
  return Promise.coroutine(function* requestBlogAsync (repoFullName) {
    const uri = `${githubRawPrefix}/${repoFullName}/master/blog.md`;
    console.log(uri);
    const blog = yield request.get(uri);
    console.log(blog || 'no blog available');
    return blog;
  })
  .then(r => res.send(r));
}




module.exports = {
  receivePushNotification,
  getBlog,
};
