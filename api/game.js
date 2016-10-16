// app.use(route.post('/match/override', books.list));

var router = require('koa-router')();
var bodyParser = require('koa-body')();
var fetch = require('node-fetch');

router
  .get('/', function *(next) {
    var games = yield fetch('http://localhost:8080/matches', { method: 'GET' })
    .then(function(res) {
        return res.json();
    });

    this.body = {
      games: games
    }
  });

module.exports = router;
