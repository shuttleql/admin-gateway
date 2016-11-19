var router = require('koa-router')();
var bodyParser = require('koa-body')();
var authFetch = require('../authFetch');

var JWT_SECRET = require('../secrets').JWT_SECRET;
var jwtUtil = require('../JWT/jwtUtil');

router
  .post('/auth', bodyParser, function *(next) {
    var that = this;
    var resp = yield authFetch('http://localhost:8080/users/auth', {
      method: 'POST',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    }).then(function(json) {
      json.token = jwtUtil.encode(json.id, JWT_SECRET);
      return json;
    });

    this.body = resp;
  })
  .get('/game', function *(next) {
    var games = yield authFetch('http://localhost:8082', { method: 'GET' })
    .then(function(res) {
        return res.json();
    });

    this.body = games
  })
  .get('/users/info', function *(next) {
    var user = yield authFetch('http://localhost:8080/users/' + this.session.id, {method: 'GET'})
      .then(function(res) {
        return res.json();
      });

      this.body = user;
  })
  .get('/session/current', function *(next) {
    var resp = yield authFetch('http://localhost:8081/current', { method: 'GET' })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        return {};
      }
    });

    this.body = resp;
  });

module.exports = router;
