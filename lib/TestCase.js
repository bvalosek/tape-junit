module.exports = TestCase;

/**
 * @constructor
 */
function TestCase()
{
  this.id         = null;
  this.name       = '(unamed)';
  this.timestamp  = Date.now();
  this.time       = 0;
  this.file       = '';
  this.line       = null;
  this.assertions = 0;
  this.failures   = 0;
  this.errors     = 0;

  this.type       = '';
  this.message    = '';
}



