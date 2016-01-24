var objectAssign = require('object-assign');

var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var DevCard = require('./DevCard');

var style = {
  title: {
    fontSize: '25px',
    margin: '20px 0',
    padding: '0 30px'
  }
};

var DevCardNamespace = React.createClass({
  propTypes: {
    namespace: React.PropTypes.string.isRequired,
    cards: React.PropTypes.array.isRequired,
    jumpTo: React.PropTypes.string,
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
        $('h2', { style: style.title }, namespace),
        cards.map(function(props, i) {
          var mergedProps = objectAssign(
            { namespace: namespace,
              key: i, ref: component.checkJump(props.name) },
            props
          );

          return $(DevCard, mergedProps);
        })
      )
    );
  }
});

module.exports = DevCardNamespace;
