var run = require('devcards').run;

var context = require.context('./', true, /\.card\.js$/);
run(context.keys(), context);

module.hot.accept();
