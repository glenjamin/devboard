var path = require('path');
var fs = require('fs');

var cssFile = path.join(__dirname, '../lib/prism-styles.css');
var jsFile = path.join(__dirname, '../lib/prism-styles.js');

var lines = fs.readFileSync(cssFile, 'utf8').split(/\n/);

var started = false;

var newLines = lines.map(function(line) {
  if (line == '/* start */') {
    started = true;
    return 'module.exports = "\\';
  }
  if (line == '/* end */') {
    started = false;
    return '";';
  }
  if (started) {
    return line + '\\';
  }
  return line;
});

fs.writeFileSync(jsFile, newLines.join("\n"));

console.warn("Updated %s from %s", jsFile, cssFile);
