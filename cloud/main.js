
exports.helloWorld = function(params, cb){
  cb(null, {msg: 'Hello ' + params.hello});
};
