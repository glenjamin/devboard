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
    border: '1px solid #ccc',
    borderRadius: '3px',
    overflow: 'hidden',
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
    borderBottom: '1px solid #ccc',
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
  }
};

var DevCard = React.createClass({
  displayName: 'DevCard',
  propTypes: {
    name: React.PropTypes.string,
    doc: React.PropTypes.string,
    body: React.PropTypes.any,
    options: React.PropTypes.shape({
      frame: React.PropTypes.bool
    })
  },
  getInitialState: function() {
    return { target: false };
  },
  showTarget: function() {
    this.setState({ target: true });
  },
  hideTarget: function() {
    this.setState({ target: false });
  },
  render: function() {
    var name = this.props.name;
    var namespace = this.props.namespace;
    var doc = this.props.doc;
    var body = this.props.body;
    var opts = this.props.options || {};

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
              $(Body, { body: body })
            )
        )
      )
    );
  }
});

module.exports = DevCard;
