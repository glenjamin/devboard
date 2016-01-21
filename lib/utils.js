exports.defined = function defined(x) {
  if (typeof x == 'undefined') return false;
  if (x === null) return false;
  return true;
};
