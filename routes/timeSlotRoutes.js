const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeSlotController');


router.post('', timeSlotController.createTimeSlot);
router.get('/timesheet/:id', timeSlotController.getTimeSlots);
router.get('/:id', timeSlotController.getTimeSlotById);
router.put('/:id', timeSlotController.updateTimeSlot);
router.delete('/:id', timeSlotController.deleteTimeSlot);

module.exports = router;
