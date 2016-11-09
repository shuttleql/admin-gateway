var jwtUtil = require('./jwtUtil');

function* jwtChecker(next) {
  if (this.path != "/shared/auth") {
    var token = this.headers.token;
    var id = jwtUtil.decode(token);
    if (!id) {
      this.throw('Invalid token', 400);
    }
  }

  yield next;
}

module.exports = jwtChecker;