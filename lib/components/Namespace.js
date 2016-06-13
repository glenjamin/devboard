var objectAssign = require('object-assign');

var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var utils = require('../utils');
var defined = utils.defined;

var routes = require('../routes');

var Link = require('./Link');
var Card = require('./Card');

var styleGuide = require('../style-guide');
var style = {
  title: {
    fontFamily: styleGuide.fontFamily,
    fontSize: '25px',
    fontWeight: styleGuide.headingWeight,
    margin: '20px 0',
    padding: '10px 30px',
    background: '#fff'
  },
  ul: {
    listStyleType: 'disc',
    margin: '10px 30px',
    padding: '0 30px',
    background: '#fff'
  },
  li: {
    padding: 0,
    margin: 0
  },
  link: {
    display: 'block',
    fontFamily: styleGuide.fontFamily,
    fontSize: '14px',
    lineHeight: styleGuide.bodyLineHeight
  },
};

var Namespace = React.createClass({
  displayName: 'DevboardNamespace',
  propTypes: {
    namespace: React.PropTypes.string.isRequired,
    cards: React.PropTypes.array.isRequired,
    jumpTo: React.PropTypes.string,
    options: React.PropTypes.shape({
      toc: React.PropTypes.boolean
    })
  },
  componentDidMount: function() {
    /* eslint-env browser */
    document.title = 'Devboard | ' + this.props.namespace;
  },
  queueJump: function(to) {
    // Set a marker we'll scroll to when the element is ready
    this.nextJump = to;
  },
  componentWillMount: function() {
    if (this.props.jumpTo) this.queueJump(this.props.jumpTo);
  },
  componentWillReceiveProps: function(nextProps) {
    var jumpTo = nextProps.jumpTo;
    if (jumpTo && jumpTo != this.props.jumpTo) this.queueJump(jumpTo);
  },
  checkJump: function(name) {
    if (!name) return function(){};

    // When the child has rendered, check if we're supposed to scroll
    var comp = this;
    return function(ref) {
      if (!ref || !comp.nextJump || comp.nextJump != name) return;

      var node = ReactDOM.findDOMNode(ref);
      if (node && node.scrollIntoView) node.scrollIntoView();
      comp.nextJump = null;
    };
  },
  render: function() {
    var component = this;
    var namespace = this.props.namespace;
    var cards = this.props.cards;
    var opts = this.props.options || {};

    return (
      $('div', null,
        $('h2', { style: style.title },
          Link.make(routes.href(namespace), namespace)
        ),
        opts.toc && this.renderTOC(),
        cards.map(function(props, i) {
          var name = defined(props.name) ? props.name : i;
          var mergedProps = objectAssign(
            {
              namespace: namespace,
              key: routes.href(namespace, name),
              ref: component.checkJump(name)
            },
            props
          );

          return $(Card, mergedProps);
        })
      )
    );
  },
  renderTOC: function() {
    var namespace = this.props.namespace;
    var cards = this.props.cards;
    return (
      $('ul', { style: style.ul },
        cards.map(function(card) {
          if (!defined(card.name)) return null;

          var href = routes.href(namespace, card.name);
          return $('li', { key: href, style: style.li },
            $(Link, { href: href, style: style.link }, card.name)
          );
        })
      )
    );
  }
});

module.exports = Namespace;
