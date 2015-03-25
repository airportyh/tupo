#! /usr/bin/env node

var fs = require('fs')
var typos = require('./typos')
var program = require('commander')

program
  .usage('[options] file')
  .option('-t, --type [type]', 'Type of typo')
  .on('--help', function(){
    console.log('  Available types:\n')
    console.log(Object.keys(typos).map(function(line){
      return '    ' + line
    }).join('\n'))
  })

program.parse(process.argv)

var filename = program.args[0]
if (!filename){
  program.outputHelp()
  process.exit()
}
main(filename, program.type || 'random')

function main(filename, typoType){
  console.log('Reading', filename)
  var contents = fs.readFileSync(filename).toString()
  var typo = typos[typoType]
  if (!typo){
    console.log('Unknown typo type:', typoType)
    process.exit(1)
  }
  fs.writeFileSync(filename, typo(contents))
  console.log('Wrote', filename)
}