#! /usr/bin/env node

var fs = require('fs')
var typos = require('./typos')
var cmdLn = require('cmd-ln')

cmdLn(function(filename, typoType){
  console.log('Reading', filename)
  var contents = fs.readFileSync(filename).toString()
  var typo = typos[typoType]
  if (!typo){
    console.log('Unknown typo type:', typoType)
    process.exit(1)
  }
  fs.writeFileSync(filename, typo(contents))
  console.log('Wrote', filename)
})