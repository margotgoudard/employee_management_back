const express = require('express');
const router = express.Router();
const mensualTimetableController = require('../controllers/mensualTimetableController');
const { validateToken }= require('../middleware/auth')

router.post('', validateToken, mensualTimetableController.createMensualTimetable);
router.get('/user/:id', validateToken, mensualTimetableController.getMensualTimetables);
router.get('/:id', validateToken, mensualTimetableController.getMensualTimetableById);
router.put('/:id', validateToken, mensualTimetableController.updateMensualTimetable);
router.delete('/:id', validateToken, mensualTimetableController.deleteMensualTimetable);

// Grouped json routes
// les plages horaires de tous les jours pour un mois donné (id_timetable)
router.get('/all-timeslot-day-month/:id', validateToken, mensualTimetableController.getMensualDailyTimeSlot);
router.get('/all-details-month/:id', validateToken, mensualTimetableController.getMensualTimetableWithDetails);


module.exports = router;
