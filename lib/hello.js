var util = require('util');
var express = require('express');
var router = new express.Router();
var fh = require('fh-mbaas-api');

// GET endpoint for 'hello', response based on url params
router.get('/hello/:name', function(req, res, next) {
  console.log("Got req: ", req.url, req.prarms);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({hello: req.params.name || 'world'}));
});

// GET endpoint for 'hello', response based on Query params, e.g. ../hello/?hello=there
router.get('/hello', function(req, res, next) {
  console.log("Got req: ", req.url, req.query);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({hello: req.query.hello || 'world'}));
});

// This endpoint uses the FeedHenry Cloud API and Live Stats
router.get('/goodbye', function(req, res, next) {
  console.log("Got req: ", req.url, req.query);

  // Log a live stat
  fh.stats.inc('numGoodByes');

  // analytics logging

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({goodbye: 'all the best!'}));
});



module.exports = router;