var React = require('react');

var $ = React.createElement;

var styleGuide = require('../style-guide');
var style = {
  row: {
    float: 'left',
    border: styleGuide.cardBorder,
    padding: 20,
    margin: 10
  },
  clearfix: {
    clear: 'both',
    height: 1,
    width: '100%'
  }
};

var Row = React.createClass({
  displayName: 'Row',
  propTypes: {
    children: React.PropTypes.any.isRequired,
  },
  render: function() {
    return $('div', {},
      React.Children.map(this.props.children, function(child) {
        return $('div', { style: style.row }, child);
      }),
      $('div', { style: style.clearfix }, '')
    );
  }
});

module.exports = Row;
