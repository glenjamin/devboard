var React = require('react');

var $ = React.createElement;

var Markdown = require('./Markdown');
var Data = require('./Data');
var RegExpBody = require('./RegExpBody');

var styleGuide = require('../style-guide');
var style = {
  number: {
    fontFamily: styleGuide.monoFontFamily,
    background: 'inherit',
    color: '#3B5BB5',
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

function isSet(x) {
  if (!x.constructor) return false;
  if (x.constructor.name != 'Set') return false;
  return !!(x.add && x.has && x.toString);
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
      return $(RegExpBody, null, body);
    }
    if (isDate(body)) {
      return $(Data, null, body.toString());
    }
    if (isSet(body)) {
      var contents = Array.from(body)
        .map(function(item) {
          return JSON.stringify(item, null, ' ');
        })
        .join(', ');

      return $(Data, null, '#{ ' + contents + ' }');
    }
    return $(Data, null, JSON.stringify(body, null, ' '));
  }
});

module.exports = Body;
