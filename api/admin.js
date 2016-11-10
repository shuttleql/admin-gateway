var router = require('koa-router')();
var bodyParser = require('koa-body')();
var authFetch = require('../authFetch');

router
  .post('/user/register', bodyParser, function *(next) {
    console.log(this.request.body);

    var resp = yield authFetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
      return res.json();
    });

    this.body = resp;
  })
  .put('/user/:id', bodyParser, function *(next) {
    var userUrl = 'http://localhost:8080/users/' + this.params.id;

    var resp = yield authFetch(userUrl, {
      method: 'PUT',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    this.body = resp;
  })
  .delete('/user/:id', function *(next) {
    var userUrl = 'http://localhost:8080/users/' + this.params.id;

    var resp = yield authFetch(userUrl, {
      method: 'DELETE'
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    this.body = resp;
  })
  .post('/session/create', function *(next) {
    var resp = yield authFetch('http://localhost:8081/create', { method: 'POST' })
    .then(function(res) {
      return res.statusText;
    });

    this.body = resp;
  })
  .put('/session/end', function *(next) {
    var resp = yield authFetch('http://localhost:8081/end', { method: 'PUT' })
    .then(function(res) {
        return res.statusText;
    });

    this.body = resp;
  })
  .post('/session/checkin', function *(next) {
    var resp = yield authFetch('http://localhost:8081/checkin', { method: 'POST' })
    .then(function(res) {
        return res.statusText;
    });

    this.body = resp;
  })
  .put('/session/checkout', function *(next) {
    var resp = yield authFetch('http://localhost:8081/checkout', { method: 'PUT' })
    .then(function(res) {
        return res.statusText;
    });

    this.body = resp;
  })
  .put('/session/status/:status', bodyParser, function *(next) {
    var sessionUrl = 'http://localhost:8082/status/' + this.params.status;

    var resp = yield authFetch(sessionUrl, {
      method: 'PUT',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
        return res.json();
    });

    this.body = resp;
  });

module.exports = router;
