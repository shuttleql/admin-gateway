// app.use(route.post('/user/login', user.login));
// app.use(route.post('/user/register', books.home));

var router = require('koa-router')();
var bodyParser = require('koa-body')();
var fetch = require('node-fetch');

router
  .get('/login', bodyParser, function *(next) {
    console.log(this.params);
    var matches = yield fetch('http://localhost:8080/matches', { method: 'GET' })
    .then(function(res) {
        return res.json();
    });
    this.body = {
      ayy: matches
    }
  });

module.exports = router;
