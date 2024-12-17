const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middleware/upload'); 

const { validateToken } = require('../middleware/auth')

router.post('/',validateToken, upload.single('document'), documentController.createDocument); 
router.get('/',validateToken, documentController.getDocuments);
router.get('/:id_document',validateToken, documentController.getDocumentById); 
router.put('/:id_document',validateToken, upload.single('document'), documentController.updateDocument); 
router.delete('/:id_document',validateToken, documentController.deleteDocument); 
router.get('/category/:id_category',validateToken, documentController.getDocumentsByDocumentCategory);
router.get('/user/:id_user',validateToken, documentController.getDocumentsByUser);
router.get('/category/:id_category/user/:id_user',validateToken, documentController.getDocumentsByDocumentCategoryAndUser);

module.exports = router;
