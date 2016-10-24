var koa = require('koa');
var logger = require('koa-logger');
var cors = require('koa-cors')
var api = require('koa-router')();

var admin = require('./api/admin');
var player = require('./api/player');
var shared = require('./api/shared');

var app = koa();

app.use(cors({
  origin  : true,
  headers : [
    'Accept',
    'Content-Type',
    'User-Agent',
    'X-Session-Token',
  ]
}));

app.use(logger());

api.use('/admin', admin.routes());
api.use('/player', player.routes());
api.use('/shared', shared.routes());

app.use(api.routes());

app.listen(3000);
