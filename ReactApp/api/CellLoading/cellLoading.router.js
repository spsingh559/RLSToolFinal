const router = require('express').Router();
const cellLoadingController = require('./cellLoading.controller');
router.post('/',cellLoadingController.postLoadData);
// router.get('/:_id',cellLoadingController.getIDData);
router.get('/:projectID',cellLoadingController.getCellLoading);

// router.put('/',cellSummaryController.updateCellSummary);
router.delete('/:_id',cellLoadingController.deleteData);

exports = module.exports = router;
