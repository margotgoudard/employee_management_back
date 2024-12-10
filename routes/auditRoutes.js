const express = require('express');
const router = express.Router();

const auditController = require('../controllers/auditController'); 

router.post('', auditController.createAudit);
router.get('', auditController.getAudits);
router.get('/:id_audit', auditController.getAuditById);
router.put('/:id_audit', auditController.updateAudit);
router.delete('/:id_audit', auditController.deleteAudit);

module.exports = router;
