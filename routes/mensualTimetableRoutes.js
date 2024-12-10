const express = require('express');
const router = express.Router();
const mensualTimetableController = require('../controllers/mensualTimetableController');

router.post('', mensualTimetableController.createMensualTimetable);
router.get('/user/:id', mensualTimetableController.getMensualTimetables);
router.get('/:id', mensualTimetableController.getMensualTimetableById);
router.put('/:id', mensualTimetableController.updateMensualTimetable);
router.delete('/:id', mensualTimetableController.deleteMensualTimetable);

module.exports = router;
