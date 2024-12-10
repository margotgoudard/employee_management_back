const express = require('express');
const router = express.Router();

const auditController = require('../controllers/auditController'); 

router.post('', auditController.createAudit);
router.get('', auditController.getAudits);
router.get('/:id', auditController.getAuditById);
router.put('/:id', auditController.updateAudit);
router.delete('/:id', auditController.deleteAudit);

module.exports = router;
