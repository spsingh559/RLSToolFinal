const router = require('express').Router();
const roleSettingController = require('./roleSetting.controller');
router.post('/',roleSettingController.createRole);
router.get('/',roleSettingController.getRole);
router.put('/',roleSettingController.updateRole);
router.delete('/:_id',roleSettingController.removeRole);

exports = module.exports = router;
