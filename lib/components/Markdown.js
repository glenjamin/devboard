var React = require('react');

var $ = React.createElement;

var CommonMarkParser = require('commonmark/lib/blocks');
var CommonMarkReactRenderer = require('commonmark-react-renderer');

var parser = new CommonMarkParser();
var renderer = new CommonMarkReactRenderer({
  renderers: {
    CodeBlock: require('./CodeBlock')
  },
  transformLinkUri: null
});

var Markdown = React.createClass({
  displayName: 'Markdown',
  propTypes: {
    source: React.PropTypes.string.isRequired,
  },
  shouldComponentUpdate: function(nextProps) {
    return this.props.source != nextProps.source;
  },
  render: function() {
    return $('div', {},
      renderer.render(parser.parse(this.props.source))
    );
  },
});

module.exports = Markdown;
