var objectAssign = require('object-assign');

var React = require('react');

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
  render: function() {
    var namespace = this.props.namespace;
    var cards = this.props.cards;

    return (
      $('div', null,
        $('h2', { style: style.title }, namespace),
        cards.map(function(props, i) {
          var mergedProps = objectAssign(
            { key: i, namespace: namespace},
            props
          );

          return $(DevCard, mergedProps);
        })
      )
    );
  }
});

module.exports = DevCardNamespace;
