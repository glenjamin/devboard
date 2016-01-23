var utils = require('./utils');
var defined = utils.defined;

module.exports = function devcardApi(add) {

  // Main Card API
  // devcard(doc)
  // devcard(body)
  // devcard(doc, body)
  // devcard(name, body)
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
    } else if (arguments.length == 2) {
      if (typeof arguments[1] != 'string') {
        body = arguments[1];
        doc = null;
      }
    }
    var card = {
      name: name,
      doc: defined(doc) ? doc : null,
      body: defined(body) ? body : null,
      options: defined(options) ? options : {}
    };
    add(card);
  }

  // Anonymous card API
  // devcard.anon(doc)
  // devcard.anon(body)
  // devcard.anon(doc, body)
  // devcard.anon(body, options)
  // devcard.anon(doc, body, options)
  devcard.anon = function devcard_anon(doc, body, options) {
    if (arguments.length == 1) {
      devcard(null, arguments[0]);
    } else if (arguments.length == 2) {
      if (typeof arguments[0] == 'string') {
        devcard(null, doc, body);
      } else {
        devcard(null, null, arguments[0], arguments[1]);
      }
    } else {
      devcard(null, doc, body, options);
    }
  };

  // Noop card
  // devcard.off(...)
  devcard.off = Function.prototype;

  return devcard;
};
