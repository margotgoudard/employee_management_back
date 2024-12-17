const express = require('express');
const router = express.Router();
const placeCategoryController = require('../controllers/placeCategoryController');

const { validateToken }= require('../middleware/auth')

router.post('', validateToken, placeCategoryController.createPlaceCategory); 
router.get('', validateToken, placeCategoryController.getPlaceCategories); 
router.get('/:id', validateToken, placeCategoryController.getPlaceCategoryById); 
router.put('/:id', validateToken, placeCategoryController.updatePlaceCategory); 
router.delete('/:id', validateToken, placeCategoryController.deletePlaceCategory); 

module.exports = router;
