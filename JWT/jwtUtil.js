var jwt = require('jsonwebtoken');

var secret = process.env.JWT_SECRET;
var algorithm = 'RS256';

function encode(id) {
  return jwt.sign(id, secret, { 'algorithm': 'HS256'});
}

function decode(code) {
  try {
    var id = jwt.verify(code, secret, { 'algorithms': ['HS256'] });
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