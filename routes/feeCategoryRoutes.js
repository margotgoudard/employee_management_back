const express = require('express');
const router = express.Router();
const feeCategoryController = require('../controllers/feeCategoryController');


router.post('', feeCategoryController.createFeeCategory); 
router.get('', feeCategoryController.getFeeCategories);
router.get('/:id', feeCategoryController.getFeeCategoryById); 
router.put('/:id', feeCategoryController.updateFeeCategory); 
router.delete('/:id', feeCategoryController.deleteFeeCategory);

module.exports = router;
