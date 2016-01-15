var React = require('react');

var $ = React.createElement;

var markdown2react = require('../markdown2react');

var style = {
  card: {
    border: '1px solid #ddd',
    margin: '10px',
    backgroundColor: '#fff'
  },
  heading: {
    margin: 0,
    padding: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    color: '#666'
  },
  doc: {
    backgroundColor: '#fff'
  },
  body: {
    padding: '10px',
  }
};

var DevCard = React.createClass({
  displayName: 'DevCard',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    doc: React.PropTypes.string.isRequired,
    body: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.node,
    ]).isRequired
  },
  render: function() {
    var body = this.props.body;

    return (
      $('div', { style: style.cardStyle },
        $('h3', { style: style.headingStyle }, this.props.name),
        $('div', { style: style.docStyle }, markdown2react(this.props.doc)),
        $('div', { style: style.bodyStyle },
          typeof body === 'function' ? body() : body
        )
      )
    );
  }
});

module.exports = DevCard;
