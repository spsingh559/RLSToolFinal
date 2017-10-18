const router = require('express').Router();
const cellConstructController = require('./cellConstruct.controller');
router.post('/',cellConstructController.postData);
router.get('/:projectID',cellConstructController.getCellConstruct);
// router.put('/',cellSummaryController.updateCellSummary);
router.delete('/:_id',cellConstructController.deleteData);

exports = module.exports = router;
