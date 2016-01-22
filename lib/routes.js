var Router = require('i40');

exports.createRouter = function(update) {
  var router = Router();
  var noop = function() {};

  router.addRoute('/', noop);
  router.addRoute('/:namespace', noop);
  router.addRoute('/:namespace/:card', noop);

  return function(location) {
    var match = router.match(location.pathname);

    if (!match) {
      return update(null);
    }
    update(match.params);
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
