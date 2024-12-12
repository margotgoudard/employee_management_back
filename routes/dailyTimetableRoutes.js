const express = require('express');
const router = express.Router();
const dailyTimetableController = require('../controllers/dailyTimetableController');


router.post('', dailyTimetableController.createDailyTimetable);
router.get('/mensual/:id', dailyTimetableController.getDailyTimetablesByMensual);
router.get('/:id', dailyTimetableController.getDailyTimetableById);
router.put('/:id', dailyTimetableController.updateDailyTimetable);
router.delete('/:id', dailyTimetableController.deleteDailyTimetable);

// Calculated route
router.get('/number-worked/:id', dailyTimetableController.getTotalWorkedHours);

module.exports = router;
