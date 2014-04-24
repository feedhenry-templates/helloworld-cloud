var express = require('express');
var bodyParser = require('body-parser');

function helloRoute() {
  var hello = new express.Router();
  hello.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  hello.get('/hello', function(req, res) {
    var world = req.query ? req.query.hello : 'World';

    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify({msg: 'Hello ' + world}));
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  hello.post('/hello', function(req, res) {
    var world = req.body ? req.body.hello : 'World';

    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify({msg: 'Hello ' + world}));
  });

  return hello;
};

module.exports = helloRoute;