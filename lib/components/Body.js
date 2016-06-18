var isDate = require('is-date-object');
var isRegexp = require('is-regexp');
var inspect = require('inspect-x');

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

function isAtom(atom) {
  return (
    typeof atom === 'object' &&
    typeof atom.deref === 'function' &&
    typeof atom.addWatch === 'function' &&
    typeof atom.removeWatch === 'function'
  );
}

var Body = React.createClass({
  displayName: 'Body',
  propTypes: {
    path: React.PropTypes.string.isRequired,
    body: React.PropTypes.any.isRequired,
    cardState: React.PropTypes.any,
    setCardState: React.PropTypes.func
  },
  watchAtom: function(possibleAtom) {
    var component = this;
    if (isAtom(possibleAtom)) {
      possibleAtom.addWatch(this.props.path, function() {
        component.forceUpdate();
      });
    }
  },
  cleanupAtom: function(possibleAtom) {
    if (isAtom(possibleAtom)) {
      possibleAtom.removeWatch(this.props.path);
    }
  },
  componentWillReceiveProps: function() {
    this.cleanupAtom(this.props.body);
    this.cleanupAtom(this.props.cardState);
  },
  componentWillUnmount: function() {
    this.cleanupAtom(this.props.body);
    this.cleanupAtom(this.props.cardState);
  },
  componentDidMount: function() {
    this.watchAtom(this.props.body);
    this.watchAtom(this.props.cardState);
  },
  componentDidUpdate: function() {
    this.watchAtom(this.props.body);
    this.watchAtom(this.props.cardState);
  },
  render: function() {
    var body = this.props.body;
    if (typeof body === 'string') {
      return $(Markdown, { source: body });
    }
    if (typeof body === 'number') {
      return $('code', { style: style.number }, body);
    }
    if (typeof body === 'function') {
      return $(Body, {
        path: this.props.path,
        body: body({
          state: this.props.cardState,
          setState: this.props.setCardState
        })
      });
    }
    if (React.isValidElement(body)) {
      return $('div', {}, body);
    }
    if (isRegexp(body)) {
      return $(RegExpBody, null, body);
    }
    if (isDate(body)) {
      return $(Data, null, body.toString());
    }
    if (isAtom(body)) {
      body = body.deref();
    }
    return $(Data, null, inspect(body, { depth: null }));
  }
});

module.exports = Body;
