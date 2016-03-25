var ReactDOM = require('react-dom');

require('prism-languages');
var prism = require('prismjs');

/**
 * Use this as a lifecycle hook
 * on componentDidMount and componentDidUpdate
 */
exports.highlightComponent = function() {
  var node = ReactDOM.findDOMNode(this);
  ensurePrismCSS();
  prism.highlightElement(node);
};

function ensurePrismCSS() {
  /* eslint-env browser */
  if (ensurePrismCSS.processed) return;
  if (typeof document === 'undefined') return;
  var cssId = 'devboard-highlighting-prism-css';
  if (!document.getElementById(cssId)) {
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = cssId;
    styleTag.textContent = require('./prism-styles');
    document.head.appendChild(styleTag);
  }
  ensurePrismCSS.processed = true;
}
