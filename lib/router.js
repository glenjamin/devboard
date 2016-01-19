var Router = require('i40');

var router = Router();
var noop = function() {};

router.addRoute('/', noop);
router.addRoute('/:namespace', noop);
router.addRoute('/:namespace/:card', noop);

module.exports = router;
