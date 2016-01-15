var run = require('../').run;

var context = require.context('./', true, /\.card\.js$/);
run(context.keys(), context);

module.hot.accept();
