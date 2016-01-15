var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var DevCards = require('./lib/components/DevCards');

exports = module.exports = devcard;
exports.run = run;

/**
 * Cards
 */

// Main card
function devcard(name, doc, body) {
  devcard.current.push({name: name, doc: doc, body: body});
}

// Noop card
devcard.off = Function.prototype;


/**
 * Runtime
 */

// Rendering the cards
function render(catalog, rootId) {
  /* eslint-env browser */
  var root = document.getElementById(rootId);
  ReactDOM.render($(DevCards, { catalog: catalog }), root);
}

// Running the cards
function run(modules, require, opts) {
  opts = opts || {};

  var catalog = {};
  modules.forEach(function(m) {
    devcard.current = catalog[m] = [];
    require(m);
  });

  render(catalog, opts.rootId || 'DEVCARDS');
}
