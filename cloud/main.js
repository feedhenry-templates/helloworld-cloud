exports.hello = function(params, cb){
  cb(null, {msg: 'Hello ' + params.hello});
};
