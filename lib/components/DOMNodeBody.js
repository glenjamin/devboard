var React = require('react');
var ReactDOM = require('react-dom');

var $ = React.createElement;

var DOMNodeBody = React.createClass({
  displayName: 'DOMNodeBody',
  propTypes: {
    func: React.PropTypes.func.isRequired,
    cleanUp: React.PropTypes.func,
  },
  updateNode: function(node) {
    if (node) {
      this.props.func(node);
    } else if (this.props.cleanUp) {
      this.props.cleanUp();
    }
  },
  componentDidUpdate: function() {
    this.updateNode(ReactDOM.findDOMNode(this));
  },
  render: function() {
    return $('div', { ref: this.updateNode });
  }
});

module.exports = DOMNodeBody;
