const express = require('express');
const router = express.Router();
const expenseReportController = require('../controllers/expenseReportController');

const upload = require('../middleware/upload'); 

router.post('', upload.single('document'), expenseReportController.createExpenseReport);
router.get('/daily/:id', expenseReportController.getExpenseReportsByDailyTimetable);
router.get('/mensual/:id', expenseReportController.getExpenseReportsByMensualTimetable);
router.get('/:id', expenseReportController.getExpenseReportById);
router.put('/:id', expenseReportController.updateExpenseReport);
router.delete('/:id', expenseReportController.deleteExpenseReport);

module.exports = router;
