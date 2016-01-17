var React = require('react');

var $ = React.createElement;

var markdown2react = require('../markdown2react');

var style = {
  card: {
    border: '1px solid #eaeaea',
    borderRadius: '3px',
    margin: '10px 0',
    backgroundColor: '#fff'
  },
  heading: {
    margin: 0,
    padding: '10px 30px',
    fontSize: '18px',
    fontWeight: 'normal',
    color: '#666',
    backgroundColor: '#eaeaea',
  },
  content: {
    backgroundColor: '#fff',
    marginTop: '15px',
    padding: '0 30px 15px',
    fontSize: '16px',
  },
  doc: {
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
    doc: React.PropTypes.string.isRequired,
    body: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.node,
    ]).isRequired
  },
  render: function() {
    var name = this.props.name;
    var body = this.props.body;

    return (
      $('div', { style: style.card },
        name && $('h3', { style: style.heading }, name),
        $('div', { style: style.content },
          $('div', { style: style.doc },
            markdown2react(this.props.doc)
          ),
          $('div', { style: style.body },
            typeof body === 'function' ? body() : body
          )
        )
      )
    );
  }
});

module.exports = DevCard;
