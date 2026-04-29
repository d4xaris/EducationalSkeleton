const router = require('express').Router();
const ctrl = require('../controllers/TaskController');

router.get('/',        ctrl.getAll.bind(ctrl));
router.get('/:id',     ctrl.getOne.bind(ctrl));
router.post('/',       ctrl.create.bind(ctrl));
router.put('/:id',     ctrl.update.bind(ctrl));
router.delete('/:id',  ctrl.delete.bind(ctrl));

module.exports = router;
