var createHistory = require('history').createHashHistory;

var React = require('react');

var $ = React.createElement;

var utils = require('../utils');
var find = utils.find;

var routes = require('../routes');
var createRouter = routes.createRouter;
var createHref = routes.createHref;

var DevCardNamespace = require('./DevCardNamespace');
var DevCardNamespaceList = require('./DevCardNamespaceList');

var style = {
  app: {
    backgroundColor: '#fff',
    margin: '0 auto',
    maxWidth: '970px',
    padding: '0 30px 100px'
  },
  heading: {
    fontSize: '35px',
    margin: '30px 0',
    padding: '0 30px'
  }
};

var DevCards = React.createClass({
  displayName: 'DevCards',
  propTypes: {
    catalog: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      namespace: null,
      card: null
    };
  },
  componentDidMount: function() {

    var history = createHistory({queryKey: false});

    var setState = this.setState.bind(this);

    var notFound = function() {
      history.push('/');
    };

    this.release = history.listen(createRouter(setState, notFound));
  },
  componentWillUnmount: function() {
    this.release();
  },
  render: function() {
    var catalog = this.props.catalog;
    var currentNamespace = this.state.namespace;
    var currentCard = this.state.card;

    var body = null;

    if (!currentNamespace) {
      body = $(DevCardNamespaceList, { catalog: catalog });
    }
    else {

      var cards = catalog[currentNamespace];

      if (currentCard) {
        var singleCard = find(cards, function(card) {
          return card.name === currentCard;
        });

        cards = [singleCard];
      }

      body = $(DevCardNamespace, {
        key: currentNamespace,
        namespace: currentNamespace,
        cards: cards
      });
    }

    return (
      $('div', { style: style.app },
        $('h1', { style: style.heading },
          $('a', { href: createHref() }, "DevCards")
        ),
        body
      )
    );
  }
});

module.exports = DevCards;
