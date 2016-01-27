var objectAssign = require('object-assign');

var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var CommonMark = require('commonmark');
var CommonMarkReactRenderer = require('commonmark-react-renderer');

require('prism-languages');
var prism = require('prismjs');

var parser = new CommonMark.Parser();
var renderer = new CommonMarkReactRenderer();

var styleGuide = require('../style-guide');
// These are applied with plain JS, not react
// so unitless stuff doesn't work
var style = {
  pre: {
    background: '#eee',
    padding: '15px 30px',
    margin: '0 -31px',
    borderRadius: 0,
    border: '1px solid #ccc',
    fontFamily: styleGuide.monoFontFamily,
    fontSize: '13px',
    overflow: 'auto',
    // 'wordBreak': 'break-all',
    // 'wordWrap': 'break-word'
  },
  code: {
    fontFamily: 'inherit'
  }
};

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
  [].forEach.call(codeBlocks, function(code) {
    ensurePrismCSS();
    prism.highlightElement(code);
    code.className = 'devcards-highlighted-code-block';
    objectAssign(code.style, style.code);

    var pre = code.parentNode;
    objectAssign(pre.style, style.pre);
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
