const express = require('express');
const router = express.Router();
const dailyTimetableController = require('../controllers/dailyTimetableController');
const { validateToken } = require('../middleware/auth')


router.post('', validateToken, dailyTimetableController.createDailyTimetable);
router.get('/mensual/:id', validateToken, dailyTimetableController.getDailyTimetablesByMensual);
router.get('/:id', validateToken, dailyTimetableController.getDailyTimetableById);
router.put('/:id', validateToken, dailyTimetableController.updateDailyTimetable);
router.delete('/:id', validateToken, dailyTimetableController.deleteDailyTimetable);

router.get('/number-worked/:id', dailyTimetableController.getTotalWorkedHours);

module.exports = router;
