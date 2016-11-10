// app.use(route.post('/match/override', books.list));

var router = require('koa-router')();
var bodyParser = require('koa-body')();
var fetch = require('node-fetch');

router
  .post('/user/register', bodyParser, function *(next) {
    console.log(this.request.body);

    var resp = yield fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
      return res.json();
    });

    this.body = resp;
  })
  .post('/session/create', function *(next) {
    var resp = yield fetch('http://localhost:8081/create', { method: 'POST' })
    .then(function(res) {
      return res.statusText;
    });

    this.body = resp;
  })
  .put('/session/end', function *(next) {
    var resp = yield fetch('http://localhost:8081/end', { method: 'PUT' })
    .then(function(res) {
        return res.statusText;
    });

    this.body = resp;
  })
  .post('/session/checkin', function *(next) {
    var resp = yield fetch('http://localhost:8081/checkin', { method: 'POST' })
    .then(function(res) {
        return res.statusText;
    });

    this.body = resp;
  })
  .put('/session/checkout', function *(next) {
    var resp = yield fetch('http://localhost:8081/checkout', { method: 'PUT' })
    .then(function(res) {
        return res.statusText;
    });

    this.body = resp;
  })
  .put('/session/status/:status', bodyParser, function *(next) {
    var sessionUrl = 'http://localhost:8082/status/' + this.params.status;

    var resp = yield fetch(sessionUrl, {
      method: 'PUT',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
        return res.json();
    });

    this.body = resp;
  });

module.exports = router;
