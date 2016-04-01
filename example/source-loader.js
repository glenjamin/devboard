var qs = require('querystring');

module.exports = function(source) {
  if (this.cacheable) this.cacheable();
  var query = qs.parse((this.query).substring(1));
  var token = query.token;
  var regex = new RegExp('^\\s*//\\s*' + token + '$', 'gm');
  var start = regex.exec(source);
  if (!start) {
    this.value = "** Cannot find source start matching `" + token + "` **";
    return this.value;
  }
  var end = regex.exec(source);
  if (!end) {
    this.value = "** Cannot find source end matching `" + token + "` **";
    return this.value;
  }
  var afterStartComment = start.index + start[0].length;
  var snippet = source.substring(afterStartComment, end.index).trim();
  if (query.indent) {
    snippet = snippet.replace(/^/gm, indent(query.indent));
  }
  this.value = snippet;
  return snippet;
};

function indent(n) {
  n = parseFloat(n);
  return new Array(n + 1).join(' ');
}
