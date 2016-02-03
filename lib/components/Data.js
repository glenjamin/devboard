var React = require('react');

var $ = React.createElement;

var syntax = require('../syntax');

var styleGuide = require('../style-guide');
var style = {
  data: {
    fontFamily: styleGuide.monoFontFamily,
    background: 'inherit',
    color: '#3B5BB5',
    fontSize: '18px',
  }
};

var Data = React.createClass({
  displayName: 'Body',
  propTypes: {
    lang: React.PropTypes.string,
    children: React.PropTypes.string.isRequired,
  },
  shouldComponentUpdate: function(nextProps) {
    return (
      this.props.children != nextProps.children
      ||
      this.props.lang != nextProps.lang
    );
  },
  componentDidMount: syntax.highlightComponent,
  componentDidUpdate: syntax.highlightComponent,
  render: function() {
    var lang = this.props.lang || 'js';
    return $('code',
      { className: 'language-' + lang, style: style.data },
      this.props.children
    );
  }
});

module.exports = Data;
