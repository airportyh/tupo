# tupo

`tupo` is a command line script that adds a typo into your JavaScript.

## Install

`npm install tupo -g`

## Usage

```
Usage: cli [options] <JS file>

Options:

  -h, --help         output usage information
  -t, --type [type]  Type of typo

Available types:

  Syntax Errors:
    keyword - mispellings of keywords
    mismatch - mismatching of paranthesis, braces or brackets
    binaryOperator - missing binary operators (+, -, *, /, etc)
    comma - missing commas
    quotes - mismatching of quotes
    syntax - randomly select an above syntax error type

  Runtime Errors:
    identifier - mispellings of identifiers (vars and object properties)
    dot - missing dot operators
    string - mispellings of string literals
    runtime - randomly select an above runtime error type

  random - randomly select any of the above listed typo types
```