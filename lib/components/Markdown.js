var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var CommonMark = require('commonmark');
var CommonMarkReactRenderer = require('commonmark-react-renderer');

require('prism-languages');
var prism = require('prismjs');

var parser = new CommonMark.Parser();
var renderer = new CommonMarkReactRenderer();

var Markdown = React.createClass({
  displayName: 'Markdown',
  propTypes: {
    source: React.PropTypes.string.isRequired,
  },
  shouldComponentUpdate: function(nextProps) {
    return this.props.source != nextProps.source;
  },
  componentDidMount: highlightMe,
  componentDidUpdate: highlightMe,
  render: function() {
    return $('div', {},
      renderer.render(parser.parse(this.props.source))
    );
  },
});

function highlightMe() {
  var node = ReactDOM.findDOMNode(this);
  var codeBlocks = node.querySelectorAll('pre code');
  [].forEach.call(codeBlocks, function(block) {
    prism.highlightElement(block);
    block.className += ' devcards-highlighted-code-block';
    ensurePrismCSS();
  });
}

function ensurePrismCSS() {
  /* eslint-env browser */
  if (ensurePrismCSS.processed) return;
  if (typeof document === 'undefined') return;
  var cssId = 'devcards-highlighting-prism-css';
  if (!document.getElementById(cssId)) {
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = cssId;
    styleTag.textContent = require('../prism-styles');
    document.head.appendChild(styleTag);
  }
  ensurePrismCSS.processed = true;
}

module.exports = Markdown;
