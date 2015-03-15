var esprima = require('esprima')
var transforms = require('./transforms')

exports.keyword = simpleRewriter(
  function(token){ return token.type === 'Keyword' },
  function(token){ return transforms.random(token.value) }
)

exports.mismatch = simpleRewriter(
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

exports.binaryOperator = simpleRewriter(
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

exports.comma = simpleRewriter(
  function(token){
    return token.type === 'Punctuator' && token.value === ','
  },
  function() { return '' }
)

exports.identifier = simpleRewriter(
  function(token){ return token.type === 'Identifier' },
  function(token){ return transforms.random(token.value) }
)

function simpleRewriter(match, modify){
  return function(contents){
    var tokens = esprima.tokenize(contents, {
      range: true
    })

    var matches = tokens.filter(match)

    var idx = Math.floor(Math.random() * matches.length)
    var chosen = matches[idx]

    var result = 
      contents.substring(0, chosen.range[0]) +
      modify(chosen) +
      contents.substring(chosen.range[1])

    return result
  }
}