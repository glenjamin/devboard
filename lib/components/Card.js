var objectAssign = require('object-assign');

var React = require('react');

var $ = React.createElement;

var utils = require('../utils');
var defined = utils.defined;
var combine = utils.combine;

var routes = require('../routes');

var CardHeading = require('./CardHeading');
var Ticker = require('./Ticker');
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
      hidden: React.PropTypes.bool,
      onTick: React.PropTypes.func,
      tickInterval: React.PropTypes.number,
      tickAutoplay: React.PropTypes.bool,
    })
  },
  getInitialState: function() {
    var opts = this.props.options;
    var cardState = defined(opts.state) ? opts.state : {};
    return { cardState: cardState };
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
  timerTick: function() {
    if (typeof this.props.options.onTick !== 'function') return;
    this.props.options.onTick({
      state: this.state.cardState,
      setState: this.setCardState
    });
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
          $(CardHeading, { namespace: namespace, name: name }),



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

          this.renderFooterIfNeeded([
            opts.inspect &&
              $(Body, {
                key: 'inspect',
                path: routes.href(namespace, name, 'inspect'),
                body: this.state.cardState
              }),
            defined(opts.onTick) &&
              $(Ticker, {
                key: 'tickers',
                onTick: this.timerTick,
                interval: opts.tickInterval || 2000,
                autoplay: defined(opts.tickAutoplay) ? opts.tickAutoplay : true
              })
          ])
        )
      )
    );
  },
  renderFooterIfNeeded: function(items) {
    items = items.filter(Boolean);
    if (items.length == 0) return null;
    return $('div', { style: style.footer }, items);
  }
});

module.exports = Card;
