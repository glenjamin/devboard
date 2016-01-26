var hjs = require('highlight.js');

function escape(value) {
  return value
    .replace(/&/gm, '&amp;')
    .replace(/</gm, '&lt;')
    .replace(/>/gm, '&gt;');
}

module.exports = function highlight(lang, code) {
  if (!lang) {
    return escape(code);
  }

  // Handling JSX
  if (/^jsx$/i.test(lang)) {
    lang = 'js';
  }

  var isLanguageSupported = hjs.getLanguage(lang);

  if (!isLanguageSupported) {
    return escape(code);
  }

  return hjs.highlight(lang, code).value || code;
};
