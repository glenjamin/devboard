var createHistory = require('history').createHashHistory;

var React = require('react');

var $ = React.createElement;

var utils = require('../utils');
var find = utils.find;

var routes = require('../routes');
var createRouter = routes.createRouter;

var Link = require('./Link');
var DevCardNamespace = require('./DevCardNamespace');
var DevCardNamespaceList = require('./DevCardNamespaceList');

var styleGuide = require('../style-guide');
var style = {
  app: {
    backgroundColor: '#fff',
    margin: '0 auto',
    maxWidth: '970px',
    padding: '0 30px 100px'
  },
  heading: {
    fontFamily: styleGuide.fontFamily,
    fontSize: '18px',
    lineHeight: styleGuide.headingLineHeight,
    fontWeight: 'normal',
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

    var router = createRouter(updateRoute);
    this.release = history.listen(function(location) {
      router(location.pathname);
    });

    function updateRoute(params) {
      if (!params) {
        history.push(routes.path());
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
        return history.push(routes.path(ns));
      }
      return comp.setState({ namespace: ns, card: card, focus: params.focus });
    }
  },
  componentWillUnmount: function() {
    this.release();
  },
  render: function() {
    var catalog = this.props.catalog;
    var ns = this.state.namespace;
    var card = this.state.card;
    var focus = this.state.focus;

    return (
      $('div', { style: style.app },
        $('h1', { style: style.heading },
          Link.make(routes.href(), "DevCards"),
          ns && $('span', null,
            ' / ',
            Link.make(routes.href(ns), ns)
          ),
          card && $('span', null,
            ' / ',
            Link.make(routes.href(ns, card), card)
          ),
          focus && $('span', null,
            ' / ',
            Link.make(routes.href(ns, card, 'focus'), 'focus')
          )
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
    var focus = this.state.focus;

    var cards = catalog[ns];

    if (currentCard && focus) {
      cards = [findCard(cards, currentCard)];
    }

    return (
      $(DevCardNamespace, {
        key: ns,
        namespace: ns,
        cards: cards,
        jumpTo: !focus ? currentCard : null
      })
    );
  }
});

module.exports = DevCards;
