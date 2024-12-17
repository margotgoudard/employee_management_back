const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeSlotController');
const { validateToken }= require('../middleware/auth')

router.post('', validateToken, timeSlotController.createTimeSlot);
router.get('/timesheet/:id', validateToken,  timeSlotController.getTimeSlots);
router.get('/:id', validateToken, timeSlotController.getTimeSlotById);
router.put('/:id', validateToken, timeSlotController.updateTimeSlot);
router.delete('/:id', validateToken, timeSlotController.deleteTimeSlot);


module.exports = router;
