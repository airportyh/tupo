var transforms = require('./transforms')
var falafel = require('falafel')
var esprimaBased = require('./esprima-based')

exports.keyword = esprimaBased.keyword
exports.mismatch = esprimaBased.mismatch
exports.binaryOperator = esprimaBased.binaryOperator
exports.comma = esprimaBased.comma

exports.identifier = simpleRewriter(
  function(node){ return node.type === 'Identifier' },
  function(node){ node.update(transforms.random(node.name)) }
)

exports.braces = simpleRewriter(
  function(node){ return node.type === 'BlockStatement' },
  deleteFrontOrBack
)

exports.quotes = simpleRewriter(
  function(node){
    return node.type === 'Literal' && typeof node.value === 'string'
  },
  deleteFrontOrBack
)

exports.exprParans = simpleRewriter(
  function(node){
    return node.type === 'CallExpression'
  },
  function(node){
    var src = node.source()
    if (Math.random() > 0.5){
      src = src.substring(0, 
        node.arguments[0].start - node.start - 1) + 
        src.substring(
          node.arguments[node.arguments.length - 1].start - node.start)
      node.update(src)
    }else{
      deleteBack(node)
    }
  }
)

var allBasicTypes = Object.keys(exports)
exports.random = function(contents){
  var idx = Math.floor(Math.random() * allBasicTypes.length)
  return exports[allBasicTypes[idx]](contents)
}

function deleteFrontOrBack(node){
  var src = node.source()
  if (Math.random() > 0.5){
    node.update(src.substring(1))
  }else{
    deleteBack(node)
  }
}

function deleteBack(node){
  var src = node.source()
  node.update(src.substring(0, src.length - 1))
}

function simpleRewriter(match, modify){
  return function(contents){
    var numTargets = countNodeTypes(contents, match)
    var chosen = Math.floor(Math.random() * numTargets)
    var count = 0
    return falafel(contents, function(node){
      if (match(node)){
        if (count === chosen){
          modify(node)
        }
        count++
      }
    })
  }
}

function countNodeTypes(contents, fn){
  var count = 0
  falafel(contents, function(node){
    if (fn(node)){
      count++
    }
  })
  return count
}

