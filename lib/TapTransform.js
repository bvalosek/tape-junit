module.exports = TapTransform;

var inherits  = require('util').inherits;
var Transform = require('stream').Transform;

inherits(TapTransform, Transform);

module.exports = Transform;

/**
 * @constructor
 */
function TapTransform(opts)
{
  opts = opts || {};
  opts.objectMode = true;
  Transform.apply(opts);
}

