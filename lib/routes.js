var Router = require('i40');

exports.createRouter = function(update) {
  var router = Router();
  var noop = function() {};

  router.addRoute('/', noop);
  router.addRoute('/:namespace', noop);
  router.addRoute('/:namespace/:card', noop);

  return function(pathname) {
    var match = router.match(pathname);

    if (!match) {
      return update(null);
    }
    update(match.params);
  };
};

exports.href = function(ns, card) {
  return '/#' + exports.path(ns, card);
};

exports.path = function(namespace, card) {
  var href = '/';

  if (namespace) {
    href += encodeURIComponent(namespace);
    if (card) {
      href += '/' + encodeURIComponent(card);
    }
  }

  return href;
};
