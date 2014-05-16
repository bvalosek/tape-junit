module.exports = TapeToJUnit;

var Transform   = require('stream').Transform;
var inherits    = require('util').inherits;
var TestSuite   = require('./TestSuite.js');
var TestCase    = require('./TestCase.js');
var SuiteWriter = require('./SuiteWriter.js');

inherits(TapeToJUnit, Transform);

/**
 * Stream transform that consumes the object stream from a tape test run and
 * outputs a stream of JUnit XML.
 * @constructor
 */
function TapeToJUnit(opts)
{
  Transform.call(this, opts);

  // Objects are written into this stream but it outputs buffer chunks
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;

  // Internal parsing state
  this._started = false;
  this._lastTime = 0;
  this._suites = {};

  // Create a new writer that will output on this stream
  var _this = this;
  this._writer = new SuiteWriter(function(d) { _this.push(d); });
}

/**
 * Process incoming object chunks from tape.
 * @param {object} chunk input
 * @param {string} encoding
 * @param {Function} done
 * @private
 */
TapeToJUnit.prototype._transform = function(chunk, encoding, done)
{
  if (!this._started) {
    this._pushIntro();
    this._started = true;
  }

  if (!this._lastTime)
    this._lastTime = Date.now();

  switch (chunk.type) {
    case 'test':
      this._parseSuite(chunk);
      break;
    case 'assert':
      this._parseCase(chunk);
      break;
    case 'end':
      var suite = this._suites[chunk.test];
      this._writer.output(suite);
      break;
  }

  done();
};

/**
 * Called when the incoming object stream is done.
 * @private
 * @param {Function} done
 */
TapeToJUnit.prototype._flush = function(done)
{
  this._pushOutro();
  done();
};

/**
 * Translate tape object into proper TestSuite
 * @param {object} data
 */
TapeToJUnit.prototype._parseSuite = function(data)
{
  var suite = new TestSuite();
  suite.id   = data.id;
  suite.name = data.name;
  this._suites[suite.id] = suite;
};

/**
 * Translate tape objecet into proper TestCase
 * @param {object} data
 */
TapeToJUnit.prototype._parseCase = function(data)
{
  var suite = this._suites[data.test];

  var test = new TestCase();
  test.id   = data.id;
  test.time = this._getDelta()/1000;
  test.type = data.operator;

  if (data.operator === 'error') {
    test.errors = 1;
  } else {
    
    if (data.file) {
      test.file = data.file.match(/(.*):\d+:\d+$/)[1];
    }
    
    if (data.line) {
      test.line = data.line;
    }
    
    if (data.name) {
      test.name = data.name;
    }

    if (data.ok) {
      test.assertions = 1;
    } else {
      test.failures = 1;
    }
  }

  suite.tests.push(test);
};

/**
 * @return {number} Number of milliseconds that have ellapsesd since the last
 * call to this function.
 */
TapeToJUnit.prototype._getDelta = function()
{
  var now = Date.now();
  var d = now - this._lastTime;
  this._lastTime = now;
  return d;
};

/**
 * @private
 */
TapeToJUnit.prototype._pushIntro = function()
{
  this.push('<?xml version="1.0" encoding="UTF-8"?>\n');
  this.push('<testsuites>\n');
};

/**
 * @private
 */
TapeToJUnit.prototype._pushOutro = function()
{
  this.push('</testsuites>\n');
};

