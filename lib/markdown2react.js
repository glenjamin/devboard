var CommonMark = require('commonmark');
var CommonMarkReactRenderer = require('commonmark-react-renderer');

var codeRenderer = require('./code-renderer');

var parser = new CommonMark.Parser();
var renderer = new CommonMarkReactRenderer({
  renderers: {
    CodeBlock: codeRenderer
  }
});

module.exports = function markdown2react(md) {
  return renderer.render(parser.parse(md));
};
