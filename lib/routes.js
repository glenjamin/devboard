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
