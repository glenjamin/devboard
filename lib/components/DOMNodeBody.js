var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var DOMNodeBody = React.createClass({
  displayName: 'DOMNodeBody',
  propTypes: {
    render: React.PropTypes.func.isRequired,
    cleanUp: React.PropTypes.func,
  },
  updateNode: function() {
    var node = ReactDOM.findDOMNode(this);
    this.props.render(node);
  },
  componentDidMount: function() {
    this.updateNode();
  },
  componentDidUpdate: function() {
    this.updateNode();
  },
  componentWillUnmount: function() {
    if (typeof this.props.cleanUp !== 'function') return;
    var node = ReactDOM.findDOMNode(this);
    this.props.cleanUp(node);
  },
  render: function() {
    return $('div');
  }
});

module.exports = DOMNodeBody;
