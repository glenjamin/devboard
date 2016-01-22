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

function findCard(cards, cardName) {
  return find(cards, function(card) {
    return card.name === cardName;
  });
}

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
    var comp = this;
    var catalog = this.props.catalog;
    var history = createHistory({queryKey: false});

    this.release = history.listen(createRouter(updateRoute));

    function updateRoute(params) {
      if (!params) {
        history.push('/');
      }
      var ns = params.namespace;
      if (!ns) {
        return comp.setState({ namespace: null, card: null });
      }
      if (!catalog[ns]) {
        return history.push('/');
      }
      var card = params.card;
      if (!card) {
        return comp.setState({ namespace: ns, card: null });
      }
      if (!findCard(catalog[ns], card)) {
        // This substring is horrible
        // TODO: find a better option
        return history.push(createHref(ns).substring(2));
      }
      return comp.setState({ namespace: ns, card: card });
    }
  },
  componentWillUnmount: function() {
    this.release();
  },
  render: function() {
    var catalog = this.props.catalog;
    var ns = this.state.namespace;

    return (
      $('div', { style: style.app },
        $('h1', { style: style.heading },
          $('a', { href: createHref() }, "DevCards")
        ),
        ns ?
          this.renderNamespace() :
          $(DevCardNamespaceList, { catalog: catalog })
      )
    );
  },
  renderNamespace: function() {
    var catalog = this.props.catalog;
    var ns = this.state.namespace;
    var currentCard = this.state.card;

    var cards = catalog[ns];

    if (currentCard) {
      cards = [findCard(cards, currentCard)];
    }

    return (
      $(DevCardNamespace, {
        key: ns,
        namespace: ns,
        cards: cards
      })
    );
  }
});

module.exports = DevCards;
