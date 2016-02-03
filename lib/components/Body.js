var React = require('react');

var $ = React.createElement;

var utils = require('../utils');
var combine = utils.combine;

var Markdown = require('./Markdown');

var syntax = require('../syntax');

var styleGuide = require('../style-guide');
var style = {
  data: {
    fontFamily: styleGuide.monoFontFamily,
    background: 'inherit',
    color: '#3B5BB5',
    fontSize: '18px',
  },
  number: {
    fontSize: '25px',
  }
};

function isDate(x) {
  if (!x.constructor) return false;
  if (x.constructor.name != 'Date') return false;
  return !!x.toString;
}

function isRegex(x) {
  if (!x.constructor) return false;
  if (x.constructor.name != 'RegExp') return false;
  return !!(x.exec && x.test && x.toString);
}

var Data = React.createClass({
  displayName: 'Body',
  propTypes: {
    children: React.PropTypes.string.isRequired,
  },
  shouldComponentUpdate: function(nextProps) {
    return this.props.children != nextProps.children;
  },
  componentDidMount: syntax.highlightComponent,
  componentDidUpdate: syntax.highlightComponent,
  render: function() {
    return $('code',
      { className: 'language-js', style: style.data },
      this.props.children
    );
  }
});

var Body = React.createClass({
  displayName: 'Body',
  propTypes: {
    body: React.PropTypes.any.isRequired,
  },
  render: function() {
    var body = this.props.body;
    if (typeof body === 'string') {
      return $(Markdown, { source: body });
    }
    if (typeof body === 'number') {
      return $('code',
        { style: combine(style.data, style.number) },
        body
      );
    }
    if (React.isValidElement(body)) {
      return $('div', {}, body);
    }
    if (isRegex(body)) {
      return $(Data, null, body.toString());
    }
    if (isDate(body)) {
      return $(Data, null, body.toString());
    }
    return $(Data, null, JSON.stringify(body, null, ' '));
  }
});

module.exports = Body;
