var router = require('koa-router')();
var bodyParser = require('koa-body')();
var authFetch = require('../authFetch');

router
  .get('/users', function *(next) {
    var sessionResp = yield authFetch('http://localhost:8081/getCurrentUsers', { method: 'GET' })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        return [];
      }
    });

    var map = {};
    for(var i = 0; i < sessionResp.length; i++) {
      var obj = sessionResp[i];
      map[obj.userId] = 1;
    }

    var userResp = yield authFetch('http://localhost:8080/users', { method: 'GET' })
      .then(function(res) {
        return res.json();
      });

    var users = [];
    for(var i = 0; i < userResp.length; i++) {
      var user = userResp[i];
      user["checkedin"] = user.id in map;
      users.push(user);
    }

    this.body = users;
  })
  .post('/user/register', bodyParser, function *(next) {
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
    var that = this;

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
    var that = this;

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
  })
  .post('/session/create', function *(next) {
    var that = this;
    var resp = yield authFetch('http://localhost:8081/create', { method: 'POST' })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    this.body = resp;
  })
  .put('/session/end', function *(next) {
    var that = this;
    var resp = yield authFetch('http://localhost:8081/end', { method: 'PUT' })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    this.body = resp;
  })
  .post('/session/checkin', bodyParser, function *(next) {
    var that = this;
    // Session service request
    var sessionResp = yield authFetch('http://localhost:8081/checkin', { 
      method: 'POST',
      body: JSON.stringify(this.request.body)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    // User service request
    var userId = sessionResp["userId"];
    var userUrl = 'http://localhost:8080/users/' + userId;
    var userResp = yield authFetch(userUrl, { method: 'GET'})
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    var name = userResp["firstName"] + " " + userResp["lastName"];
    var level = userResp["level"];
    var preference = userResp["preference"];
    var playerJson = { "id" : userId, "name" : name, "level" : level, "preference" : preference };

    // Game service request
    var gameUrl = 'http://localhost:8082/checkedinplayers';
    var gameResp = yield authFetch(gameUrl, { 
      method: 'POST',
      body: JSON.stringify(playerJson)
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    this.body = gameResp;
  })
  .put('/session/checkout', bodyParser, function *(next) {
    var that = this;
    // Session service request
    var sessionResp = yield authFetch('http://localhost:8081/checkout', { 
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

    // Game service request
    var userId = sessionResp["userId"];
    var gameUrl = 'http://localhost:8082/checkedinplayers/' + userId;
    var gameResp = yield authFetch(gameUrl, { method: 'DELETE' })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        that.throw(res.statusText, res.status);
      }
    });

    this.body = gameResp;
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
