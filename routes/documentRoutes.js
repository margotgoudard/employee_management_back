const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middleware/upload'); 

router.post('/', upload.single('document'), documentController.createDocument); 
router.get('/', documentController.getDocuments);
router.get('/:id', documentController.getDocumentById); 
router.put('/:id', upload.single('document'), documentController.updateDocument); 
router.delete('/:id', documentController.deleteDocument); 

module.exports = router;
