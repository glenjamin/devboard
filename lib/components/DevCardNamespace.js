var objectAssign = require('object-assign');

var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var utils = require('../utils');
var defined = utils.defined;

var routes = require('../routes');

var Link = require('./Link');
var DevCard = require('./DevCard');

var styleGuide = require('../style-guide');
var style = {
  title: {
    fontFamily: styleGuide.fontFamily,
    fontSize: '25px',
    fontWeight: styleGuide.headingWeight,
    margin: '20px 0',
    padding: '10px 30px',
    background: '#fff'
  }
};

var DevCardNamespace = React.createClass({
  displayName: 'DevCardNamespace',
  propTypes: {
    namespace: React.PropTypes.string.isRequired,
    cards: React.PropTypes.array.isRequired,
    jumpTo: React.PropTypes.string,
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

    return (
      $('div', null,
        $('h2', { style: style.title },
          Link.make(routes.href(namespace), namespace)
        ),
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

          return $(DevCard, mergedProps);
        })
      )
    );
  }
});

module.exports = DevCardNamespace;
