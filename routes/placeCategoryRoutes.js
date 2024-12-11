const express = require('express');
const router = express.Router();
const placeCategoryController = require('../controllers/placeCategoryController');


router.post('', placeCategoryController.createPlaceCategory); 
router.get('', placeCategoryController.getPlaceCategories); 
router.get('/:id', placeCategoryController.getPlaceCategoryById); 
router.put('/:id', placeCategoryController.updatePlaceCategory); 
router.delete('/:id', placeCategoryController.deletePlaceCategory); 

module.exports = router;
