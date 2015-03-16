var esprima = require('esprima')

module.exports = function(match, modify){
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