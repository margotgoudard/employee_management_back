const express = require('express');
const router = express.Router();
const expenseReportController = require('../controllers/expenseReportController');
const { validateToken }= require('../middleware/auth');
const upload = require('../middleware/upload'); 

router.post('', validateToken, upload.single('document'), expenseReportController.createExpenseReport);
router.get('/daily/:id' , validateToken, expenseReportController.getExpenseReportsByDailyTimetable);
router.get('/mensual/:id' , validateToken, expenseReportController.getExpenseReportsByMensualTimetable);
router.get('/:id' , validateToken, expenseReportController.getExpenseReportById);
router.put('/:id' , validateToken, expenseReportController.updateExpenseReport);
router.delete('/:id' , validateToken, expenseReportController.deleteExpenseReport);

module.exports = router;
