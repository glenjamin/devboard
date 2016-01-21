var React = require('react');

var routes = require('../routes');
var createHref = routes.createHref;

var $ = React.createElement;

var style = {
  ul: {
    listStyleType: 'none',
    margin: '0 30px',
    padding: 0
  },
  li: {
    padding: '0 10px 0 5px',
    borderBottom: '1px solid #ccc'
  },
  link: {
    display: 'block',
    fontSize: '25px',
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
            $('a', { href: createHref(namespace), style: style.link },
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
