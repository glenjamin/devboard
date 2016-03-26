var React = require('react');

var $ = React.createElement;

var routes = require('../routes');

var Link = require('./Link');

var styleGuide = require('../style-guide');
var style = {
  heading: {
    position: 'relative',
    margin: 0,
    padding: 0,
    fontFamily: styleGuide.fontFamily,
    fontSize: '18px',
    fontWeight: 'normal',
    color: '#666',
    backgroundColor: '#eaeaea',
    borderBottom: styleGuide.cardBorder,
  },
  targetLink: {
    color: 'inherit',
    position: 'absolute',
    left: 0,
    padding: '10px',
    display: 'block',
  },
  headingLink: {
    color: 'inherit',
    display: 'block',
    padding: '10px 30px'
  },
};

var CardHeading = React.createClass({
  displayName: 'CardHeading',
  propTypes: {
    namespace: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return { hover: false };
  },
  startHover: function() {
    this.setState({ hover: true });
  },
  endHover: function() {
    this.setState({ hover: false });
  },
  render: function() {
    var namespace = this.props.namespace;
    var name = this.props.name;
    return (
      $('h3', {
        style: style.heading,
        onMouseEnter: this.startHover,
        onMouseLeave: this.endHover
      },
        this.state.hover &&
          $(Link, {
            href: routes.href(namespace, name),
            style: style.targetLink
          }, '#'),
        $(Link, {
          href: routes.href(namespace, name, 'focus'),
          style: style.headingLink
        }, name)
      )
    );
  }
});

module.exports = CardHeading;
