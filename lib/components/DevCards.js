var objectAssign = require('object-assign');

var React = require('react');

var $ = React.createElement;

var DevCard = require('./DevCard');

var style = {
  app: {
    backgroundColor: '#fff',
    margin: '0 auto',
    maxWidth: '970px',
    paddingBottom: '100px'
  },
  heading: {
    fontSize: '35px',
    margin: 0,
    padding: '30px 30px'
  },
  title: {
    fontSize: '25px',
    margin: 0,
    padding: '10px 30px'
  }
};

var DevCards = React.createClass({
  displayName: 'DevCards',
  propTypes: {
    catalog: React.PropTypes.object.isRequired
  },
  render: function() {
    var catalog = this.props.catalog;

    return (
      $('div', { style: style.app },
        $('h1', { style: style.heading}, "DevCards"),
        Object.keys(catalog).map(function(m) {
          return (
            $('div', { key: m },
              $('h2', { style: style.title }, m),
              catalog[m].map(function(props, i) {
                return $(DevCard, objectAssign({ key: i }, props));
              })
            )
          );
        })
      )
    );
  }
});

module.exports = DevCards;
