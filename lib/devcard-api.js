var utils = require('./utils');
var defined = utils.defined;

module.exports = function devcardApi(add) {

  // Main Card API
  // devcard(doc)
  // devcard(name, doc, body)
  // devcard(name, doc, body, options)
  function devcard(name, doc, body, options) {
    if (arguments.length == 1) {
      if (typeof arguments[0] == 'string') {
        doc = arguments[0];
      } else {
        body = arguments[0];
      }
      name = null;
    }
    add({
      name: name,
      doc: defined(doc) ? doc : null,
      body: defined(body) ? body : null,
      options: defined(options) ? options : {}
    });
  }

  // Anonymous card API
  // devcard.anon(doc, body)
  // devcard.anon(doc, body, options)
  devcard.anon = function devcard_anon(doc, body, options) {
    devcard(null, doc, body, options);
  };

  // Noop card
  // devcard.off(...)
  devcard.off = Function.prototype;

  return devcard;
};
