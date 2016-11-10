var jwt = require('jsonwebtoken');

var algorithm = 'HS256';

function encode(id, secret) {
  return jwt.sign(id, secret, { 'algorithm': algorithm});
}

function decode(code, secret) {
  try {
    var id = jwt.verify(code, secret, { 'algorithms': [algorithm] });
    if (id == parseInt(id, 10)) {
      return parseInt(id);
    } else {
      return null;
    }
  } catch(err) {
    return null;
  }
}

module.exports = {'encode': encode, 'decode': decode};