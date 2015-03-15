var esprima = require('esprima')
var transforms = require('./transforms')

exports.keyword = function(contents){
  var tokens = esprima.tokenize(contents, {
    range: true,
    raw: true,
    tokens: true,
    loc: true
  })

  var keywords = tokens.filter(function(node){
    return node.type === 'Keyword'
  })

  var idx = Math.floor(Math.random() * keywords.length)
  var chosen = keywords[idx]
  var typo = transforms.random(chosen.value)

  var result = contents.substring(0, chosen.range[0]) + typo +
    contents.substring(chosen.range[1])
  return result
}