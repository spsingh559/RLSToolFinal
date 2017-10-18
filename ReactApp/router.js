var router = require('express').Router();

router.use('/roleSetting', require('./api/roleSetting/roleSetting.router'));
router.use('/trackSetting', require('./api/trackSetting/trackSetting.router'));
router.use('/ProjectDetail', require('./api/ProjectDetail/ProjectDetail.router'));
router.use('/cellSummary', require('./api/CellSummary/cellSummary.router'));
router.use('/cellConstruct', require('./api/CellConstruct/cellConstruct.router'));
router.use('/cellLoading', require('./api/CellLoading/cellLoading.router'));

exports = module.exports = router;
