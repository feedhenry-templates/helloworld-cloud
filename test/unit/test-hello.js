var proxyquire = require('proxyquire');
var assert = require('assert');
var util = require('util');

// Sample setUp call - note this is called once, before the other tests in this file are run
exports.setUp = function(finish) {
  finish();
};

// Sample tearDown - note this is called once, after all other tests have been run in this file
exports.tearDown = function(finish) {
  finish();
};

exports.it_should_test_happy_GET = function(finish) {

  // Note we have no requires in hello.js to stub out.
  // For more information on using proxyquire, see: https://github.com/thlorenz/proxyquire
  var hello = proxyquire('lib/hello.js', {})();

  // mock request
  var req = {
    query: {
      hello: 'test get'
    },
    method: 'GET',
    url: '/hello',
    headers: []
  };

  // mock response
  var endCalled = false;
  var res = {
    writeHead: function(code, headers) {

    },
    end: function(body) {
      var data = JSON.parse(body);
      assert.equal(data.msg, 'Hello test get');
      endCalled = true;
      finish();
    }
  };

  // Invoke the /hello route, note the test finishes when the 'end' is called on our mock response above.
  hello(req, res, function next(err){
    assert.ok(!err, 'Unexpected error: ' + util.inspect(err));
  });

};

exports.it_should_test_happy_POST = function(finish) {

  // Note we have no requires in hello.js to stub out.
  // For more information on using proxyquire, see: https://github.com/thlorenz/proxyquire
  var hello = proxyquire('lib/hello.js', {})();

  // mock request
  var req = {
    body: {
      hello: 'test post'
    },
    method: 'POST',
    url: '/hello',
    headers: []
  };

  // mock response
  var endCalled = false;
  var res = {
    writeHead: function(code, headers) {

    },
    end: function(body) {
      var data = JSON.parse(body);
      assert.equal(data.msg, 'Hello test post');
      endCalled = true;
      finish();
    }
  };

  // Invoke the /hello route, note the test finishes when the 'end' is called on our mock response above.
  hello(req, res, function next(err){
    assert.ok(!err, 'Unexpected error: ' + util.inspect(err));
  });

};
