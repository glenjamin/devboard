var React = require('react');

var $ = React.createElement;

var routes = require('../routes');

var Link = require('./Link');

var styleGuide = require('../style-guide');
var style = {
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: '0 30px 50px',
    background: '#fff'
  },
  li: {
    padding: '0 10px 0 5px',
    borderBottom: '1px solid #ccc'
  },
  link: {
    display: 'block',
    fontFamily: styleGuide.fontFamily,
    fontSize: '25px',
    lineHeight: styleGuide.bodyLineHeight,
    padding: '10px 0',
  },
  count: {
    display: 'inline-block',
    marginTop: '5px',
    fontSize: '18px',
    padding: '0 15px',
    float: 'right',
    borderRadius: '50px',
    background: '#999',
    color: 'white'
  }
};

var DevCardNamespaceList = React.createClass({
  render: function() {
    var catalog = this.props.catalog;

    return (
      $('ul', { style: style.ul },
        Object.keys(catalog).map(function(namespace) {
          var num = catalog[namespace].length;

          return $('li', { key: namespace, style: style.li },
            $(Link, { href: routes.href(namespace), style: style.link },
              namespace,
              $('span', { style: style.count }, num)
            )
          );
        })
      )
    );
  }
});

module.exports = DevCardNamespaceList;
