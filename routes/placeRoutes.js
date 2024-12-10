const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

router.post('', placeController.createPlace);
router.get('', placeController.getPlaces);
router.get('/:id', placeController.getPlaceById);
router.put('/:id', placeController.updatePlace);
router.delete('/:id', placeController.deletePlace);

module.exports = router;
