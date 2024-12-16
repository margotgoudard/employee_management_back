const express = require('express');
const router = express.Router();

const { auditController } = require('../controllers/auditController'); 
const { validateToken } = require('../middleware/auth');

router.post('', validateToken, auditController.createAudit);
router.get('', validateToken, auditController.getAudits);
router.get('/:id_audit', validateToken, auditController.getAuditById);
router.put('/:id_audit',validateToken, auditController.updateAudit);
router.delete('/:id_audit',validateToken, auditController.deleteAudit);
router.get('/user/:id_user', validateToken, auditController.getAuditsByUserId);

module.exports = router;
