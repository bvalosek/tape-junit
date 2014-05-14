module.exports = TestSuite;

var os = require('os');

/**
 * @constructor
 */
function TestSuite()
{
  this.id        = null;

  this.name      = '';
  this.timestamp = Date.now();
  this.hostname  = os.hostname();
  this.time      = 0;
  this.tests     = [];
}

TestSuite.prototype.errors = function()
{
  return this.tests.reduce(function(acc, test) {
    return acc + test.errors;
  }, 0);
};


TestSuite.prototype.assertions = function()
{
  return this.tests.reduce(function(acc, test) {
    return acc + test.assertions;
  }, 0);
};

TestSuite.prototype.failures = function()
{
  return this.tests.reduce(function(acc, test) {
    return acc + test.failures;
  }, 0);
};
