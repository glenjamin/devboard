var React = require('react');
var $ = React.createElement;

var highlight = require('./highlight');

var CODE_BLOCK_CLASS = 'devcards-syntax-highlighted-block';

module.exports = function codeRenderer(node, props, children) {
  var lang = (node.info || '').trim() || null;
  var className = CODE_BLOCK_CLASS + ' language-' + lang;

  var highlightedCode = highlight(lang, children[0]);

  var codeElement = $('code', {
    className: className,
    dangerouslySetInnerHTML: {
      __html: highlightedCode
    }
  });

  return $('pre', props, codeElement);
};
