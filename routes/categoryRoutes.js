const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories); 
router.get('/:id_category', categoryController.getCategoryById); 
router.put('/:id_category', categoryController.updateCategory);
router.delete('/:id_category', categoryController.deleteCategory);

module.exports = router;
