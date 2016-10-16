// app.use(route.post('/user/register', books.home));
// app.use(route.post('/match/override', books.list));
// app.use(route.post('/session/checkin/:id', books.home));
// app.use(route.post('/session/checkout/:id', books.home));

var router = require('koa-router')();
var bodyParser = require('koa-body')();
var fetch = require('node-fetch');

router
  .put('/session/status/:status', function *(next) {
    var sessionUrl = 'http://localhost:8080/status/' + this.params.status;
    
    var resp = yield fetch(sessionUrl, { method: 'PUT' })
    .then(function(res) {
        return res.json();
    });

    this.body = resp;
  });

module.exports = router;
