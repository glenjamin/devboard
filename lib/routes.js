var assign = require('object-assign');

var Router = require('i40');

exports.createRouter = function(update) {
  var router = Router();

  router.addRoute('/', {});
  router.addRoute('/:namespace', {});
  router.addRoute('/:namespace/:card', {});
  router.addRoute('/:namespace/:card/focus', { focus: true });

  return function(pathname) {
    var match = router.match(pathname);

    if (!match) {
      return update(null);
    }
    update(assign({}, match.params, match.fn));
  };
};

exports.href = function(ns, card, focus) {
  return '/#' + exports.path(ns, card, focus);
};

exports.path = function(namespace, card, focus) {
  var href = '/';

  if (namespace) {
    href += encodeURIComponent(namespace);
    if (card) {
      href += '/' + encodeURIComponent(card);
      if (focus) {
        href += '/focus';
      }
    }
  }

  return href;
};
