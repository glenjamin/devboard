var hjs = require('highlight.js');

module.exports = function highlight(lang, code) {
  if (!lang) {
    return code;
  }

  var isLanguageSupported = hjs.getLanguage(lang);

  if (!isLanguageSupported) {
    return code;
  }

  return hjs.highlight(lang, code).value || code;
};
