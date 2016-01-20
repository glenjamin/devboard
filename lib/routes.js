var Router = require('i40');

exports.createRouter = function(setState, notFound) {
  var router = Router();
  var noop = function() {};

  router.addRoute('/', noop);
  router.addRoute('/:namespace', noop);
  router.addRoute('/:namespace/:card', noop);

  return function(location) {
    var match = router.match(location.pathname);

    if (!match) {
      return notFound();
    }

    var params = match.params;

    setState({
      namespace: params.namespace || null,
      card: params.card || null
    });
  };
};

exports.createHref = function(namespace, card) {
  var href = '/#/';

  if (!namespace) {
    return href;
  }

  if (namespace) {
    href += encodeURIComponent(namespace);
  }

  if (card) {
    href += '/' + encodeURIComponent(card);
  }

  return href;
};
