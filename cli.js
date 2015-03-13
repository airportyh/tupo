#! /usr/bin/env node

var fs = require('fs')
var falafel = require('falafel')

var filename = process.argv[2]
console.log('Reading', filename)
var contents = fs.readFileSync(filename).toString()

var mistypeIdentifier = simpleRewriter(
  function(node){ return node.type === 'Identifier' },
  function(node){ node.update(randomTransform(node.name)) }
)
var blockBracesMismatch = simpleRewriter(
  function(node){ return node.type === 'BlockStatement' },
  deleteFrontOrBack
)

var stringQuotesMismatch = simpleRewriter(
  function(node){
    return node.type === 'Literal' && typeof node.value === 'string'
  },
  deleteFrontOrBack
)

fs.writeFileSync(filename, stringQuotesMismatch(contents))
console.log('Wrote', filename)

function deleteFrontOrBack(node){
  var src = node.source()
  if (Math.random() > 0.5){
    node.update(src.substring(1))
  }else{
    node.update(src.substring(0, src.length - 1))
  }
}

function simpleRewriter(match, modify){
  return function(content){
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

function stringQuotesMismatch(content){
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

function randomTransform(text){
  var transforms = [mutation, deletion, insertion]
  var idx = Math.floor(Math.random() * transforms.length)
  var transform = transforms[idx]
  return transform(text)
}

function insertion(text){
  var idx = Math.floor(Math.random() * text.length)
  return text.substring(0, idx) + randomChar() + text.substring(idx)
}

function deletion(text){
  var idx = Math.floor(Math.random() * text.length)
  return text.substring(0, idx - 1) + text.substring(idx)
}

function mutation(text){
  var idx = Math.floor(Math.random() * text.length)
  return text.substring(0, idx - 1) + randomChar() + text.substring(idx)
}

function randomChar(){
  var range = 122 - 48 + 1
  var n = 48 + Math.floor(Math.random() * range)
  return String.fromCharCode(n)
}
