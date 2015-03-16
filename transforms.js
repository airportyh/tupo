var typo = require('typojs')
exports.random = function(text){
  var typos = typo(text)
  var idx = Math.floor(Math.random() * typos.length)
  return typos[idx]
}
/*
exports.random = function randomTransform(text){
  var transforms = [exports.mutation, exports.deletion, exports.insertion]
  var idx = Math.floor(Math.random() * transforms.length)
  var transform = transforms[idx]
  return transform(text)
}

exports.insertion = function insertion(text){
  var idx = Math.floor(Math.random() * text.length)
  return text.substring(0, idx) + randomChar() + text.substring(idx)
}

exports.deletion = function deletion(text){
  var idx = Math.floor(Math.random() * text.length)
  return text.substring(0, idx - 1) + text.substring(idx)
}

exports.mutation = function mutation(text){
  var idx = Math.floor(Math.random() * text.length)
  return text.substring(0, idx - 1) + randomChar() + text.substring(idx)
}

function randomChar(){
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var idx = Math.floor(Math.random() * chars.length)
  return chars.charAt(idx)
}
*/