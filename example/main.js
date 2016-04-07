var context = require.context('./', true, /\.card\.js$/);
context.keys().forEach(function(moduleName) {
  context(moduleName);
});

if (module.hot) module.hot.accept();
