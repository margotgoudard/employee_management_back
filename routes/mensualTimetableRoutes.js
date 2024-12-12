const express = require('express');
const router = express.Router();
const mensualTimetableController = require('../controllers/mensualTimetableController');

router.post('', mensualTimetableController.createMensualTimetable);
router.get('/user/:id', mensualTimetableController.getMensualTimetables);
router.get('/:id', mensualTimetableController.getMensualTimetableById);
router.put('/:id', mensualTimetableController.updateMensualTimetable);
router.delete('/:id', mensualTimetableController.deleteMensualTimetable);

// Grouped json routes
// les plages horaires de tous les jours pour un mois donné (id_timetable)
router.get('/all-timeslot-day-month/:id', mensualTimetableController.getMensualDailyTimeSlot);


module.exports = router;
