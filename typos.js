var tokenBased = require('./token-based')
var parserBased = require('./parser-based')

exports.keyword = tokenBased.keyword
exports.mismatch = tokenBased.mismatch
exports.binaryOperator = tokenBased.binaryOperator
exports.comma = tokenBased.comma
exports.identifier = tokenBased.identifier

exports.quotes = parserBased.quotes

var allBasicTypes = Object.keys(exports)
exports.random = function(contents){
  var idx = Math.floor(Math.random() * allBasicTypes.length)
  return exports[allBasicTypes[idx]](contents)
}
