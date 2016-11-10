var JWT_SECRET = require('../secrets').JWT_SECRET;

var jwtUtil = require('./jwtUtil');

function* jwtChecker(next) {
  if (this.path != "/shared/auth") {
    var token = this.headers.authorization;
    if (!token) {
      this.throw('Unauthorized Status', 401);
    }
    var split = token.split('Bearer ');
    if (split.length != 2) {
      this.throw('Unauthorized Status', 401);
    }
    var id = jwtUtil.decode(split[1], JWT_SECRET);
    if (!id) {
      this.throw('Unauthorized Status', 401);
    }
  }

  yield next;
}

module.exports = jwtChecker;