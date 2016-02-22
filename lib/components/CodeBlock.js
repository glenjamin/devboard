var React = require('react');

var $ = React.createElement;

var syntax = require('../syntax');

var styleGuide = require('../style-guide');
var style = {
  code: {
    display: 'block',
    background: '#eee',
    color: 'inherit',
    padding: '15px 30px',
    margin: '15px -31px',
    borderRadius: 0,
    border: '1px solid #ccc',
    fontFamily: styleGuide.monoFontFamily,
    fontSize: '13px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
  }
};

var CodeBlock = React.createClass({
  displayName: 'CodeBlock',
  propTypes: {
    language: React.PropTypes.string,
    literal: React.PropTypes.string
  },
  shouldComponentUpdate: function(nextProps) {
    return (
      this.props.literal != nextProps.literal
      ||
      this.props.language != nextProps.language
    );
  },
  componentDidMount: syntax.highlightComponent,
  componentDidUpdate: syntax.highlightComponent,
  render: function() {
    var lang = this.props.language;
    var className = 'devcards-highlighted-code-block';
    if (lang) className += ' language-' + lang;
    return $('code',
      { className: className, style: style.code },
      this.props.literal
    );
  },
});

module.exports = CodeBlock;
