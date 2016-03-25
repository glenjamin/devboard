var createAtom = require('js-atom').createAtom;

var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var createDefinecard = require('./lib/definecard');

var Devboard = require('./lib/components/Devboard');

var ROOT_DIV_ID = '__definecard-root';

// Singleton state
// TODO: eliminate?
var catalog = {};

exports.ns = ns;
function ns(name) {
  // Because execution of a loaded module is synchronous
  // we can expect a reloading namespace to be filled
  // in a single pass of the event loop
  // therefore we can enqueue a reRender for the next tick
  var cards = catalog[name] = [];
  function add(card) {
    cards.push(card);
    enqueueRender();
  }
  return createDefinecard(add);
}

exports.atom = createAtom;

/**
 * Rendering
 */
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
  enqueueRender.timer = requestAnimationFrame(render, 0);
}
function render() {
  ReactDOM.render($(Devboard, { catalog: catalog }), getRoot());
}
