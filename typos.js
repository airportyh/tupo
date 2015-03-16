var extend = require('util')._extend

extend(exports, require('./syntax'))
extend(exports, require('./runtime'))

var allBasicTypes = Object.keys(exports)
exports.random = function(contents){
  var idx = Math.floor(Math.random() * allBasicTypes.length)
  return exports[allBasicTypes[idx]](contents)
}
