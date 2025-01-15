const express = require('express');
const router = express.Router();
const complianceCheckController = require('../controllers/complianceCheckController');

router.get('', complianceCheckController.getComplianceChecks);
router.get('/mensual/:id', complianceCheckController.complianceCheckForTimeTable);
router.get('/weekly-hours/:id', complianceCheckController.getWeeklyHours);


module.exports = router;
