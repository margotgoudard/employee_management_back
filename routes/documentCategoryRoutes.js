const express = require('express');
const router = express.Router();
const documentCategoryController = require('../controllers/documentCategoryController');
const { validateToken } = require('../middleware/auth')

router.post('/', validateToken, documentCategoryController.createDocumentCategory);
router.get('/', validateToken, documentCategoryController.getDocumentCategories); 
router.get('/:id_document_category', validateToken, documentCategoryController.getDocumentCategoryById); 
router.put('/:id_document_category', validateToken, documentCategoryController.updateDocumentCategory);
router.delete('/:id_document_category', validateToken, documentCategoryController.deleteDocumentCategory);

module.exports = router;
