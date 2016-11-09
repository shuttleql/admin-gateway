var jwtUtil = require('./jwtUtil');

function* jwtChecker(next) {
  if (this.path != "/shared/auth") {
    var token = this.headers.token;
    var id = jwtUtil.decode(token);
    if (!id) {
      this.throw('Unauthorized Status', 401);
    }
  }

  yield next;
}

module.exports = jwtChecker;