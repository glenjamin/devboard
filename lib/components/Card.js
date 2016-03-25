var objectAssign = require('object-assign');

var React = require('react');

var $ = React.createElement;

var utils = require('../utils');
var defined = utils.defined;
var combine = utils.combine;

var routes = require('../routes');

var Link = require('./Link');
var Markdown = require('./Markdown');
var Body = require('./Body');

var styleGuide = require('../style-guide');
var style = {
  cardBase: {
    margin: '20px 0',
    backgroundColor: '#fff'
  },
  cardFrame: {
    border: styleGuide.cardBorder,
    borderRadius: '3px',
  },
  heading: {
    position: 'relative',
    margin: 0,
    padding: 0,
    fontFamily: styleGuide.fontFamily,
    fontSize: '18px',
    fontWeight: 'normal',
    color: '#666',
    backgroundColor: '#eaeaea',
    borderBottom: styleGuide.cardBorder,
  },
  targetLink: {
    color: 'inherit',
    position: 'absolute',
    left: 0,
    padding: '10px',
    display: 'block',
  },
  headingLink: {
    color: 'inherit',
    display: 'block',
    padding: '10px 30px'
  },
  content: {
    backgroundColor: '#fff',
    marginTop: '15px',
    padding: '0 30px 15px',
    fontSize: '16px',
  },
  doc: {
    fontFamily: styleGuide.fontFamily,
    fontSize: 16,
    lineHeight: styleGuide.bodyLineHeight,
    marginTop: '15px',
    padding: 0
  },
  body: {
    marginTop: '15px',
    padding: 0
  },
  footer: {
    margin: '15px -30px 0',
    padding: '15px 30px 0',
    borderTop: styleGuide.cardBorder
  }
};

var Card = React.createClass({
  displayName: 'DevboardCard',
  propTypes: {
    name: React.PropTypes.string,
    doc: React.PropTypes.string,
    body: React.PropTypes.any,
    options: React.PropTypes.shape({
      frame: React.PropTypes.bool,
      state: React.PropTypes.any,
      inspect: React.PropTypes.bool,
      hidden: React.PropTypes.bool
    })
  },
  getInitialState: function() {
    var opts = this.props.options;
    var cardState = defined(opts.state) ? opts.state : {};
    return { target: false, cardState: cardState };
  },
  showTarget: function() {
    this.setState({ target: true });
  },
  hideTarget: function() {
    this.setState({ target: false });
  },
  setCardState: function(cardState) {
    if (typeof cardState === 'function') {
      this.setState(function(s) {
        return { cardState: cardState(s.cardState) };
      });
    } else {
      this.setState(function(s) {
        return { cardState: objectAssign({}, s.cardState, cardState) };
      });
    }
  },
  render: function() {
    var name = this.props.name;
    var namespace = this.props.namespace;
    var doc = this.props.doc;
    var body = this.props.body;
    var opts = this.props.options || {};

    if (opts.hidden) return null;

    var frame = defined(opts.frame) ? opts.frame : !!name;

    return (
      $('div', {
        style: combine(
          style.cardBase,
          frame && style.cardFrame
        )
      },

        defined(name) &&
          $('h3', {
            style: style.heading,
            onMouseEnter: this.showTarget,
            onMouseLeave: this.hideTarget
          },
            this.state.target &&
              $(Link, {
                href: routes.href(namespace, name),
                style: style.targetLink
              }, '#'),
            $(Link, {
              href: routes.href(namespace, name, 'focus'),
              style: style.headingLink
            }, name)
          ),

        $('div', { style: style.content },
          defined(doc) &&
            $('div', { style: style.doc }, $(Markdown, { source: doc })),
          defined(body) &&
            $('div', { style: style.body },
              $(Body, {
                path: routes.href(namespace, name),
                body: body,
                cardState: this.state.cardState,
                setCardState: this.setCardState
              })
            ),
          opts.inspect &&
            $('div', { style: style.footer },
              $(Body, {
                path: routes.href(namespace, name, 'inspect'),
                body: this.state.cardState
              })
            )
        )
      )
    );
  }
});

module.exports = Card;
