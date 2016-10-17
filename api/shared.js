var router = require('koa-router')();
var bodyParser = require('koa-body')();
var fetch = require('node-fetch');

router
  .get('/user/login', function *(next) {
    console.log(this.params);
    this.body = {
      ayy: "matches"
    }
  })
  .get('/game', function *(next) {
    var games = yield fetch('http://localhost:8082', { method: 'GET' })
    .then(function(res) {
        return res.json();
    });

    this.body = {
      games: games
    }
  });

module.exports = router;
