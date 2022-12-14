const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const AwardController = require("../../controllers/awardController");

router.post('/publishAward', auth, AwardController.publishAward);
router.get('/currentAward', AwardController.currentAward);
router.get('/oldAwards', AwardController.oldAwards);
router.post('/finishApplication', auth, AwardController.finishApplication);
router.post('/applyAward', auth, AwardController.applyAward);
router.post('/unapplyAward', auth, AwardController.unapplyAward);
router.post('/isApplied', AwardController.isApplied);
module.exports = router;