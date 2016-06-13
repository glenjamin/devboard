var createAtom = require('js-atom').createAtom;

var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var createDefinecard = require('./lib/definecard');

var Devboard = require('./lib/components/Devboard');
var DOMNodeBody = require('./lib/components/DOMNodeBody');
var Row = require('./lib/components/Row');

var ROOT_DIV_ID = '__definecard-root';

// Singleton state
// TODO: eliminate?
var catalog = {};

exports.ns = ns;
function ns(name, options) {
  options = options || {};
  // Because execution of a loaded module is synchronous
  // we can expect a reloading namespace to be filled
  // in a single pass of the event loop
  // therefore we can enqueue a reRender for the next tick
  catalog[name] = {
    cards: [],
    options: options
  };
  var cards = catalog[name].cards;
  function add(card) {
    cards.push(card);
    enqueueRender();
  }
  return createDefinecard(add);
}

exports.atom = createAtom;

/**
 * Helpers and Wrappers for types we can't infer
 */

exports.Row = Row;

exports.DOMNode = function DOMNode(render, cleanUp) {
  return $(DOMNodeBody, { render: render, cleanUp: cleanUp });
};

/**
 * Rendering
 */

var customRender = false;
exports.customRender = function(fn) {
  customRender = fn;
};

function getRoot() {
  /* eslint-env browser */
  var root = document.getElementById(ROOT_DIV_ID);
  if (root) return root;

  var newRoot = document.createElement('div');
  newRoot.id = ROOT_DIV_ID;
  document.body.appendChild(newRoot);
  return newRoot;
}

function enqueueRender() {
  cancelAnimationFrame(enqueueRender.timer);
  enqueueRender.timer = requestAnimationFrame(renderRoot, 0);
}
function renderRoot() {
  var element = $(Devboard, { catalog: catalog });
  if (customRender) {
    element = customRender(element);
  }
  ReactDOM.render(element, getRoot());
}
