#! /usr/bin/env node

var fs = require('fs')
var typos = require('./typos')
var program = require('commander')

program
  .usage('[options] <JS file>')
  .option('-t, --type [type]', 'Type of typo')
  .on('--help', function(){
    console.log('  Available types:\n')
    console.log('    Syntax Errors:')
    console.log('      keyword - mispellings of keywords')
    console.log('      mismatch - mismatching of paranthesis, braces or brackets')
    console.log('      binaryOperator - missing binary operators (+, -, *, /, etc)')
    console.log('      comma - missing commas')
    console.log('      quotes - mismatching of quotes')
    console.log('      syntax - randomly select an above syntax error type')
    console.log()
    console.log('    Runtime Errors:')
    console.log('      identifier - mispellings of identifiers (vars and object properties)')
    console.log('      dot - missing dot operators')
    console.log('      string - mispellings of string literals')
    console.log('      runtime - randomly select an above runtime error type')
    console.log()
    console.log('    random - randomly select any of the above listed typo types')
    console.log()
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