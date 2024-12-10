const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middleware/upload'); 

router.post('/', upload.single('document'), documentController.createDocument); 
router.get('/', documentController.getDocuments);
router.get('/:id_document', documentController.getDocumentById); 
router.put('/:id_document', upload.single('document'), documentController.updateDocument); 
router.delete('/:id_document', documentController.deleteDocument); 
router.get('/category/:id_category', documentController.getDocumentsByCategory);
router.get('/user/:id_user', documentController.getDocumentsByUser);
router.get('/category/:id_category/user/:id_user', documentController.getDocumentsByCategoryAndUser);

module.exports = router;
