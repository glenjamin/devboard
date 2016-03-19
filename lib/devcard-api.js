var utils = require('./utils');
var defined = utils.defined;

module.exports = function devcardApi(add) {

  // Main Card API
  // devcard(doc)
  // devcard(body)
  // devcard(name, body)
  // devcard(name, doc)
  // devcard(name, body, options)
  // devcard(name, doc, body)
  // devcard(name, doc, body, options)
  function devcard() {
    add(processArgs.apply(this, arguments));
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

  // Hidden card
  // devcard.off(...)
  devcard.off = function devcard_off() {
    var card = processArgs.apply(this, arguments);
    card.options.hidden = true;
    add(card);
  };

  function processArgs(name, doc, body, options) {
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
    } else if (arguments.length == 3) {
      if (typeof arguments[1] != 'string') {
        options = arguments[2];
        body = arguments[1];
        doc = null;
      }
    }
    return {
      name: name,
      doc: defined(doc) ? doc : null,
      body: defined(body) ? body : null,
      options: defined(options) ? options : {}
    };
  }

  return devcard;
};
