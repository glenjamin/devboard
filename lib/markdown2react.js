var CommonMark = require('commonmark');
var CommonMarkReactRenderer = require('commonmark-react-renderer');

var parser = new CommonMark.Parser();
var renderer = new CommonMarkReactRenderer();

module.exports = function markdown2react(md) {
  return renderer.render(parser.parse(md));
};
