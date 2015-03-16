var esprima = require('esprima')

module.exports = function(match, modify){
  return function(contents){
    var ast = esprima.parse(contents, {range: true})
    var targets = []
    estraverse.traverse(ast, {
      enter: function(node){
        if (match(node)){
          targets.push(node)
        }
      }
    })
    var idx = Math.floor(Math.random() * targets.length)
    var chosen = targets[idx]
    var chosenSrc = contents.substring(chosen.range[0], chosen.range[1])
    var transformedSource = 
      contents.substring(0, chosen.range[0]) +
      modify(chosen, chosenSrc) +
      contents.substring(chosen.range[1])
    return transformedSource
  }
}
