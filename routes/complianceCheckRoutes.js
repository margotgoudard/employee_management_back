const express = require('express');
const router = express.Router();
const complianceCheckController = require('../controllers/complianceCheckController');

router.get('', complianceCheckController.getComplianceChecks);
router.get('/mensual/:id', complianceCheckController.complianceCheckForTimeTable);


module.exports = router;
