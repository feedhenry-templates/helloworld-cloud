var mbaas = require('fh-mbaas-express');
var express = require('express');
var mainjs = require('./lib/main.js');

var app = express();
app.use('/sys', mbaas.sys(mainjs));
app.use('/mbaas', mbaas.mbaas);
app.use('/cloud', mbaas.cloud(mainjs));

// You can define custom URL handlers here, like this one:
app.use('/', function(req, res){
  res.end('Your Cloud App is Running');
});

// Important that this is last!
app.use(mbaas.errorHandler());

var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
server = app.listen(port, function(){
  console.log("App started at: " + new Date() + " on port: " + port);
});
