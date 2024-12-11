const express = require('express');
const router = express.Router();
const documentCategoryController = require('../controllers/documentCategoryController');

router.post('/', documentCategoryController.createDocumentCategory);
router.get('/', documentCategoryController.getDocumentCategories); 
router.get('/:id_document_category', documentCategoryController.getDocumentCategoryById); 
router.put('/:id_document_category', documentCategoryController.updateDocumentCategory);
router.delete('/:id_document_category', documentCategoryController.deleteDocumentCategory);

module.exports = router;
