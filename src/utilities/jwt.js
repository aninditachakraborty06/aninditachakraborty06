var JWT = require('jsonwebtoken');
var secret = 'work hard';
var defaultExpireTime = 86400 // 24 hours

//to do: keep in time in config

exports.sign = function (key, expireTime) {
  if (!expireTime) expireTime = defaultExpireTime
  return new Promise((resolve, reject) => {
    try {
      var token = JWT.sign(key, secret, { expiresIn: expireTime });
      resolve(token);
    } catch (e) {
      console.log('error in signing JWT', e);
      reject(e);
    }
  })
}

exports.decode = function (jwt) {
  return new Promise((resolve, reject) => {
    try {
      JWT.verify(jwt, secret, (err, decoded) => {
        (err || !decoded) ? reject(err) : resolve(decoded);
      })
    } catch (e) {
      console.log('unable to decode JWT token: ', jwt, 'error:', e);
      reject(e);
    }
  })
}
