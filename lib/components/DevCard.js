var objectAssign = require('object-assign');

var React = require('react');

var $ = React.createElement;

var utils = require('../utils');
var defined = utils.defined;
var markdown2react = require('../markdown2react');

var routes = require('../routes');

var style = {
  cardBase: {
    margin: '20px 0',
    backgroundColor: '#fff'
  },
  cardFrame: {
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  heading: {
    margin: 0,
    padding: '10px 30px',
    fontSize: '18px',
    fontWeight: 'normal',
    color: '#666',
    backgroundColor: '#eaeaea',
    borderBottom: '1px solid #ccc'
  },
  headingLink: {
    display: 'block'
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

function styles() {
  var args = [].slice.apply(arguments);
  args.unshift({});
  return objectAssign.apply(this, args);
}

var DevCard = React.createClass({
  displayName: 'DevCard',
  propTypes: {
    name: React.PropTypes.string,
    doc: React.PropTypes.string,
    body: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.node,
    ]),
    options: React.PropTypes.shape({
      frame: React.PropTypes.bool
    })
  },
  render: function() {
    var name = this.props.name;
    var namespace = this.props.namespace;
    var doc = this.props.doc;
    var body = this.props.body;
    var opts = this.props.options || {};

    var frame = defined(opts.frame) ? opts.frame : !!name;

    return (
      $('div', {
        style: styles(
          style.cardBase,
          frame && style.cardFrame
        )
      },

        defined(name) &&
          $('h3', { style: style.heading },
            $('a', {
              href: routes.href(namespace, name),
              style: style.headingLink
            }, name)
          ),

        $('div', { style: style.content },
          defined(doc) &&
            $('div', { style: style.doc }, markdown2react(doc)),
          defined(body) &&
            $('div', { style: style.body },
              typeof body === 'function' ? body() : body
            )
        )
      )
    );
  }
});

module.exports = DevCard;
