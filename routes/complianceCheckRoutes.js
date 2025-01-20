const express = require('express');
const router = express.Router();
const complianceCheckController = require('../controllers/complianceCheckController');

router.get('', complianceCheckController.getComplianceChecks);
router.get('/mensual/:id', complianceCheckController.complianceCheckForTimeTable);
router.get('/weekly-hours/:id', complianceCheckController.getWeeklyHours);


// Récupérer les compliance checks assignés à un utilisateur
router.get('/user/:id_user/compliance-checks', complianceCheckController.getAssignedComplianceChecks);

// Récupérer tous les compliance checks
router.get('/compliance-checks', complianceCheckController.getAllComplianceChecks);

// Ajouter un compliance check à un utilisateur
router.post('/user/:id_user/compliance-checks/:id_compliance_check', complianceCheckController.addComplianceCheckToUser);

// Supprimer un compliance check d'un utilisateur
router.delete('/user/:id_user/compliance-checks/:id_compliance_check', complianceCheckController.removeComplianceCheckFromUser);

// Mettre à jour les paramètres d'un compliance check pour un utilisateur
router.put('/user/:id_user/compliance-checks/:id_compliance_check/parameters', complianceCheckController.updateComplianceCheckParameters);

// Récupérer les paramètres associés à un compliance check
router.get('/:id_compliance_check/parameters', complianceCheckController.getComplianceCheckParameters);

module.exports = router;
