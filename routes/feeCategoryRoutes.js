const express = require('express');
const router = express.Router();
const feeCategoryController = require('../controllers/feeCategoryController');
const { validateToken } = require('../middleware/auth')


router.post('', validateToken, feeCategoryController.createFeeCategory); 
router.get('', validateToken, feeCategoryController.getFeeCategories);
router.get('/:id', validateToken, feeCategoryController.getFeeCategoryById); 
router.put('/:id', validateToken, feeCategoryController.updateFeeCategory); 
router.delete('/:id', validateToken, feeCategoryController.deleteFeeCategory);

module.exports = router;
