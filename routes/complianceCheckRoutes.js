const express = require('express');
const router = express.Router();
const complianceCheckController = require('../controllers/complianceCheckController');

router.get('', complianceCheckController.getComplianceChecks);


module.exports = router;
