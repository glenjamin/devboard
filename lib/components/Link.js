var React = require('react');

var $ = React.createElement;

var utils = require('../utils');
var combine = utils.combine;

var styleGuide = require('../style-guide');
var style = {
  link: {
    color: styleGuide.linkColor,
    textDecoration: 'none'
  },
  hover: {
    textDecoration: 'underline'
  }
};

var Link = React.createClass({
  displayName: 'Link',
  propTypes: {
    href: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    hoverStyle: React.PropTypes.object,
    children: React.PropTypes.any.isRequired
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
    return (
      $('a', {
        href: this.props.href,
        onMouseEnter: this.startHover,
        onMouseLeave: this.endHover,
        style: combine(
          style.link,
          this.props.style,
          this.state.hover && style.hover,
          this.state.hover && this.props.hoverStyle
        )
      }, this.props.children)
    );
  }
});

module.exports = Link;

Link.make = function(href, content) {
  return $(Link, { href: href }, content);
};
