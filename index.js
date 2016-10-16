var koa = require('koa');
var logger = require('koa-logger');
var api = require('koa-router')();

var user = require('./api/user');
var session = require('./api/session');
var game = require('./api/game');

var app = koa();

app.use(logger());

api.use('/user', user.routes());
api.use('/session', session.routes());
api.use('/game', game.routes());

app.use(api.routes());

app.listen(3000);
