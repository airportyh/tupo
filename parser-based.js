var transforms = require('./transforms')
var esprima = require('esprima')
var estraverse = require('estraverse')

exports.quotes = simpleRewriter(
  function(node){
    return node.type === 'Literal' && typeof node.value === 'string'
  },
  deleteFrontOrBack
)

function deleteFrontOrBack(node, src){
  if (Math.random() > 0.5){
    return src.substring(1)
  }else{
    return deleteBack(node, src)
  }
}

function deleteBack(node, src){
  return src.substring(0, src.length - 1)
}

function simpleRewriter(match, modify){
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
