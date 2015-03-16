var transforms = require('./transforms')
var simpleRewriter = require('./tokenBasedRewriter')

exports.identifier = simpleRewriter(
  function(token){ return token.type === 'Identifier' },
  function(token){ return transforms.random(token.value) }
)

exports.dot = simpleRewriter(
  function(token){ 
    return token.type === 'Punctuator' && token.value === '.' },
  function(){ return '' }
)

exports.string = simpleRewriter(
  function(token){ return token.type === 'String' },
  function(token){ 
    return token.value.charAt(0) +
      transforms.random(
        token.value.substring(1, token.value.length - 2)
      ) +
      token.value.charAt(token.value.length - 1)
  }
)

var allRuntimeTypos = Object.keys(exports)
exports.runtime = function(contents){
  var idx = Math.floor(Math.random() * allRuntimeTypos.length)
  return exports[allRuntimeTypos[idx]](contents)
}