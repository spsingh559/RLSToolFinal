const router = require('express').Router();
const projectDetailController = require('./projectDetail.controller');
router.post('/',projectDetailController.createProject);
router.get('/',projectDetailController.getProject);
router.put('/',projectDetailController.updateProject);
router.delete('/:projectID',projectDetailController.removePoject);

exports = module.exports = router;
