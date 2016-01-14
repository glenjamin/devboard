import {run} from '../../src/devcards';

const context = require.context('./', true, /card\.jsx?$/);
run(context.keys(), context);

module.hot.accept();
