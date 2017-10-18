const router = require('express').Router();
const trackSettingController = require('./trackSetting.controller');
router.post('/',trackSettingController.createtrack);
router.get('/',trackSettingController.gettrack);
router.put('/',trackSettingController.updatetrack);
router.delete('/:_id',trackSettingController.removetrack);

exports = module.exports = router;
