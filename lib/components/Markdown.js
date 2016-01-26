var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var CommonMark = require('commonmark');
var CommonMarkReactRenderer = require('commonmark-react-renderer');

require('prism-languages');
var prism = require('prismjs');

var parser = new CommonMark.Parser();
var renderer = new CommonMarkReactRenderer();

function highlightMe() {
  var node = ReactDOM.findDOMNode(this);
  var codeBlocks = node.querySelectorAll('pre code');
  [].forEach.call(codeBlocks, function(block) {
    prism.highlightElement(block);
  });
}

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

module.exports = Markdown;
