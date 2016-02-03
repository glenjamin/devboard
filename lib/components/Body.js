var React = require('react');

var $ = React.createElement;

var Markdown = require('./Markdown');

var styleGuide = require('../style-guide');
var style = {
  number: {
    fontFamily: styleGuide.fontFamily,
    fontSize: '25px',
    fontWeight: 'normal',
    color: '#3B5BB5'
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
      return $('code', { style: style.number }, body);
    }
    if (React.isValidElement(body)) {
      return $('div', {}, body);
    }
    if (isRegex(body)) {
      return $('code', { style: style.data }, body.toString());
    }
    if (isDate(body)) {
      return $('code', { style: style.data }, body.toString());
    }
    return $('code',
      { style: style.data },
      JSON.stringify(body, null, ' ')
    );
  }
});

module.exports = Body;
