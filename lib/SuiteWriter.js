module.exports = SuiteWriter;

/**
 * Output a XML-represented test suite via an injected function
 * @param {function(data:string)} out
 * @constructor
 */
function SuiteWriter(out)
{
  this.out = out;
}

SuiteWriter.prototype.output = function(suite)
{
  this.out('  <testsuite ');
  this.out('name="' + suite.name + '" ');
  this.out('tests="' + suite.tests.length + '" ');
  this.out('assertions="' + suite.assertions() + '" ');
  this.out('failures="' + suite.failures() + '" ');
  this.out('errors="' + suite.errors() + '" ');
  this.out('>\n');

  var _this = this;
  suite.tests.forEach(function(t) {
    _this._outputTest(t);
  });

  this.out('  </testsuite>\n');
};

SuiteWriter.prototype._outputTest = function(test)
{
  this.out('    <testcase ');
  this.out('name="' + test.name + '" ');
  this.out('file="' + test.file + '" ');
  this.out('line="' + test.line + '" ');
  this.out('time="' + test.time + '" ');

  if (test.assertions) {
    this.out('assertions="' + test.assertions + '" ');
    this.out('/>\n');
  }
  else {
    var mode = test.failures ? 'failure' : 'error';

    if (test.failures)
      this.out('failures="' + test.failures + '" >\n');
    else
      this.out('errors="' + test.errors + '" >\n');

    this.out('      <' + mode + ' ');
    this.out('type="' + test.type + '" ');
    this.out('>\n');
    this.out('        A useful message would be nice but nah\n');
    this.out('      </' + mode + '>\n');
    this.out('    </testcase>\n');
  }
};

