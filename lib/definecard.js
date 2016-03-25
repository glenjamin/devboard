var utils = require('./utils');
var defined = utils.defined;

module.exports = function createDefinecard(add) {

  // Main Card API
  // definecard(doc)
  // definecard(body)
  // definecard(name, body)
  // definecard(name, doc)
  // definecard(name, body, options)
  // definecard(name, doc, body)
  // definecard(name, doc, body, options)
  function definecard() {
    add(processArgs.apply(this, arguments));
  }

  // Anonymous card API
  // definecard.anon(doc)
  // definecard.anon(body)
  // definecard.anon(doc, body)
  // definecard.anon(body, options)
  // definecard.anon(doc, body, options)
  definecard.anon = function definecard_anon(doc, body, options) {
    if (arguments.length == 1) {
      definecard(null, arguments[0]);
    } else if (arguments.length == 2) {
      if (typeof arguments[0] == 'string') {
        definecard(null, doc, body);
      } else {
        definecard(null, null, arguments[0], arguments[1]);
      }
    } else {
      definecard(null, doc, body, options);
    }
  };

  // Hidden card
  // definecard.off(...)
  definecard.off = function definecard_off() {
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

  return definecard;
};
