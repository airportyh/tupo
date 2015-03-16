var transforms = require('./transforms')
var rewriter = require('./tokenBasedRewriter')

exports.keyword = rewriter(
  function(token){ return token.type === 'Keyword' },
  function(token){ return transforms.random(token.value) }
)

exports.mismatch = rewriter(
  function (token){
    return token.type === 'Punctuator' &&
      ( token.value === '(' ||
        token.value === ')' ||
        token.value === '{' ||
        token.value === '}' ||
        token.value === '[' ||
        token.value === ']'
      )
  },
  function(){ return '' }
)

exports.binaryOperator = rewriter(
  function(token){
    return token.type === 'Punctuator' &&
      ( token.value === '+' ||
        token.value === '-' ||
        token.value === '*' ||
        token.value === '/' ||
        token.value === '=' ||
        token.value === '>' ||
        token.value === '<' ||
        token.value === '>=' ||
        token.value === '<=' ||
        token.value === '==' ||
        token.value === '===' ||
        token.value === '!=' ||
        token.value === '!=='
      )
  },
  function() { return '' }
)

exports.comma = rewriter(
  function(token){
    return token.type === 'Punctuator' && token.value === ','
  },
  function() { return '' }
)

exports.quotes = rewriter(
  function(token){ return token.type === 'String' },
  function(token){ return deleteFrontOrBack(token.value) }
)

var allSyntaxTypos = Object.keys(exports)
exports.syntax = function(contents){
  var idx = Math.floor(Math.random() * allSyntaxTypos.length)
  return exports[allSyntaxTypos[idx]](contents)
}

function deleteFrontOrBack(str){
  if (Math.random() > 0.5){
    return str.substring(1)
  }else{
    return deleteBack(str)
  }
}

function deleteBack(str){
  return str.substring(0, str.length - 1)
}


