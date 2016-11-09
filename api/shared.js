var router = require('koa-router')();
var bodyParser = require('koa-body')();
var fetch = require('node-fetch');

var jwtUtil = require('../JWT/jwtUtil');

router
  .post('/auth', bodyParser, function *(next) {
    var that = this;
    var resp = yield fetch('http://localhost:8080/users/auth', {
      method: 'POST',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw("invalid credential", 400);
      }
    }).then(function(json) {
      json.token = jwtUtil.encode(json.id);
      return json;
    });

    this.body = resp;
  })
  .get('/game', function *(next) {
    var games = yield fetch('http://localhost:8082', { method: 'GET' })
    .then(function(res) {
        return res.json();
    });

    this.body = games
  });

module.exports = router;
