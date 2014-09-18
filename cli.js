var path        = require('path');
var glob        = require('glob');
var tape        = require('tape');
var TapeToJUnit = require('./index.js');

// Translate to Junit XML instead of TAP
tape.createStream({ objectMode: true })
  .pipe(new TapeToJUnit())
  .pipe(process.stdout);

process.argv.slice(2).forEach(function (arg) {
  glob(arg, function (err, files) {
    files.forEach(function (file) {
      require(path.resolve(process.cwd(), file));
    });
  });
});
