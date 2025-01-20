const express = require('express');
const router = express.Router();
const complianceCheckController = require('../controllers/complianceCheckController');

const { validateToken } = require('../middleware/auth')

router.get('', complianceCheckController.getComplianceChecks);
router.get('/mensual/:id', complianceCheckController.complianceCheckForTimeTable);
router.get('/weekly-hours/:id', complianceCheckController.getWeeklyHours);

router.get('/user/:id_user/compliance-checks', validateToken, complianceCheckController.getAssignedComplianceChecks);
router.get('/compliance-checks',  validateToken,complianceCheckController.getAllComplianceChecks);
router.post('/user/:id_user/compliance-checks/:id_compliance_check', validateToken, complianceCheckController.addComplianceCheckToUser);
router.delete('/user/:id_user/compliance-checks/:id_compliance_check',  validateToken,complianceCheckController.removeComplianceCheckFromUser);
router.put('/user/:id_user/compliance-checks/:id_compliance_check/parameters',  validateToken,complianceCheckController.updateComplianceCheckParameters);
router.get('/:id_compliance_check/parameters', validateToken, complianceCheckController.getComplianceCheckParameters);

module.exports = router;
