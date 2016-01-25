var objectAssign = require('object-assign');

exports.defined = function defined(x) {
  if (typeof x == 'undefined') return false;
  if (x === null) return false;
  return true;
};

exports.find = function find(a, fn) {
  if (!a || !a.length) return null;

  for (var i = 0, l = a.length; i < l; i++) {
    if (fn(a[i])) {
      return a[i];
    }
  }

  return null;
};

exports.combine = function combine() {
  var args = [].slice.apply(arguments);
  args.unshift({});
  return objectAssign.apply(this, args);
};
