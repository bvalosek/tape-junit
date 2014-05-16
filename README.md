# tape-junit

[![Build Status](https://travis-ci.org/bvalosek/tape-junit.png?branch=master)](https://travis-ci.org/bvalosek/tape-junit)
[![NPM version](https://badge.fury.io/js/tape-junit.png)](http://badge.fury.io/js/tape-junit)

Output JUnit XML from tape-driven tests.

> This project is still pre-1.0 and not yet considered stable.

## Installation

```
$ npm install tape-junit
```

## Usage

### Command Line

```
$ tape-junit tests/**/*.js
```

### NodeJS

To use via [tape](https://github.com/substack/tape)'s streams:

```javascript
var tape        = require('tape');
var TapeToJUnit = require('tape-junit');

// Use tape's object stream mode, piped into the transform and then stdout
tape.createStream({ objectMode: true })
  .pipe(new TapeToJUnit())
  .pipe(process.stdout);

// Fire off the tests
require('./test/my-test.js');
```

## Tern Support

The source files are all decorated with [JSDoc3](http://usejsdoc.org/)-style
annotations that work great with the [Tern](http://ternjs.net/) code inference
system. Combined with the Node plugin (see this project's `.tern-project`
file), you can have intelligent autocomplete for methods in this library.

## Testing

Testing is done with [Tape](http://github.com/substack/tape) and can be run
with the command `npm test`.

Automated CI testing is done with [Travis
CI](https://travis-ci.org/bvalosek/tape-junit).

## License
Copyright 2014 Brandon Valosek

**tape-junit** is released under the MIT license.
