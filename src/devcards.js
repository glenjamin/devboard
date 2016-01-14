import React from 'react';
import ReactDOM from 'react-dom';
import DevCards from './components/DevCards.jsx';

/**
 * Cards
 */

// Main card
export default function devcard(name, doc, body) {
  devcard.current.push({name, doc, body});
}

// Noop card
devcard.off = Function.prototype;


/**
 * Runtime
 */

// Finding the root
// TODO: not finished
function getRoot() {

}

// Rendering the cards
function render(catalog, rootId) {
  const root = document.getElementById(rootId);
  ReactDOM.render(<DevCards catalog={catalog} />, root);
}

// Running the cards
export function run(modules, require, opts = {}) {
  const catalog = {};

  modules.forEach(m => {
    devcard.current = catalog[m] = [];
    require(m);
  });

  render(catalog, opts.rootId || 'DEVCARDS');
}
