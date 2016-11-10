var HMAC_SECRET = require('./secrets').HMAC_SECRET;
var jwtUtil = require('./JWT/jwtUtil');
var fetch = require('node-fetch');

function authFetch (url, data) {
  data = addAuthToken(data);
  return fetch(url, data);
}

function addAuthToken(data) {
  if (!data) {
    data = {};
  }
  if (!data.headers) {
    data.headers = {};
  }
  var key = 'Authorization-Key';
  var token = 'Authorization';
  var uniqueValue = getKey();
  data.headers[key] = uniqueValue;
  data.headers[token] = 'HMAC ' + jwtUtil.encode(uniqueValue, HMAC_SECRET);
  console.log(data);
  return data;
}

function getKey() {
  return 'ABC';
}

module.exports = authFetch;