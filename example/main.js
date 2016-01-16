var context = require.context('./', true, /\.card\.js$/);
context.keys().forEach(function(moduleName) {
  context(moduleName);
});

module.hot.accept();
