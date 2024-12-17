const ExpenseReport = require('../models/ExpenseReport');
const DailyTimetableSheet = require('../models/DailyTimetableSheet');
const FeeCategory = require('../models/FeeCategory');
const { createAudit } = require('./auditController');

const expenseReportController = {

  createExpenseReport: async (req, res) => {

    try {
      const { id_daily_timetable, id_fee_category, document_name, amount, client, motive } = req.body;
      const userId = req.auth.userId;

      if (!id_daily_timetable || !id_fee_category || !amount) {
        return res.status(400).json({ 
          message: 'Missing required fields: id_daily_timetable, id_fee_category, or amount' 
        });
      }
      const document = req.file ? req.file.buffer.toString('base64') : null;

      const expenseReport = await ExpenseReport.create({
        id_daily_timetable,
        id_fee_category,
        amount,
        document,
        document_name,
        client,
        motive,
      });
      await createAudit({
        table_name: 'expense_report',
        action: 'CREATE',
        old_values: null,
        new_values: expenseReport.dataValues,
        userId,
      });

      const response = {
        ...expenseReport.dataValues,
        document: document, 
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error creating ExpenseReport', 
        error: error.message 
      });
    }
  },


  getExpenseReportsByDailyTimetable: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'DailyTimetable ID is required' });
      }

      const expenseReports = await ExpenseReport.findAll({
        where: { id_daily_timetable: id },
      });

      if (!expenseReports.length) {
        return res.status(404).json({ message: 'No ExpenseReports found for the given DailyTimetable ID' });
      }

      const reportsWithDecodedDocs = expenseReports.map(report => ({
        ...report.dataValues,
        document: report.document ? Buffer.from(report.document, 'base64').toString() : null
      }));

      return res.status(200).json(reportsWithDecodedDocs);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching ExpenseReports', error: error.message });
    }
  },

  getExpenseReportById: async (req, res) => {
    try {
      const { id } = req.params;

      const expenseReport = await ExpenseReport.findByPk(id);

      if (!expenseReport) {
        return res.status(404).json({ message: 'ExpenseReport not found' });
      }

      const reportWithDecodedDoc = {
        ...expenseReport.dataValues,
        document: expenseReport.document
          ? Buffer.from(expenseReport.document, 'base64').toString()
          : null,
      };

      return res.status(200).json(reportWithDecodedDoc);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching ExpenseReport', error: error.message });
    }
  },

  updateExpenseReport: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_daily_timetable, amount, document_name, client, motive } = req.body;
      const userId = req.auth.userId;
  
      const expenseReport = await ExpenseReport.findByPk(id);
  
      if (!expenseReport) {
        return res.status(404).json({ message: 'ExpenseReport not found' });
      }
  
      const oldValues = { ...expenseReport.dataValues };
  
      const updatedDocument = req.file
        ? req.file.buffer.toString('base64') 
        : expenseReport.document;
  
      await expenseReport.update({
        id_daily_timetable,
        amount,
        document_name,
        document: updatedDocument,
        client,
        motive,
      });
  
      await createAudit({
        table_name: 'expense_report',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: expenseReport.dataValues,
        userId,
      });
  
      const documentInBase64 = expenseReport.document
        ? Buffer.from(expenseReport.document, 'base64').toString('base64')
        : null;
  
      const response = {
        ...expenseReport.dataValues,
        document: documentInBase64,
      };
  
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating ExpenseReport',
        error: error.message,
      });
    }
  },
  
  

  deleteExpenseReport: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.auth.userId;

      const expenseReport = await ExpenseReport.findByPk(id);

      if (!expenseReport) {
        return res.status(404).json({ message: 'ExpenseReport not found' });
      }

      const oldValues = { ...expenseReport.dataValues };

      await expenseReport.destroy();

      await createAudit({
        table_name: 'expense_report',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({ message: 'ExpenseReport deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting ExpenseReport', error: error.message });
    }
  },

  getExpenseReportsByMensualTimetable: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'MensualTimetable ID is required' });
      }

      const dailyTimetables = await DailyTimetableSheet.findAll({
        where: { id_timetable: id },
      });

      if (!dailyTimetables.length) {
        return res.status(404).json({ message: 'No DailyTimetables found for the given MensualTimetable ID' });
      }

      const dailyTimetableIds = dailyTimetables.map(dt => dt.id_daily_timetable);

      const expenseReports = await ExpenseReport.findAll({
        where: { id_daily_timetable: dailyTimetableIds },
        include: [{ model: FeeCategory, as: 'feeCategory' }],
      });

      if (!expenseReports.length) {
        return res.status(404).json({ message: 'No ExpenseReports found for the given MensualTimetable ID' });
      }

      const reportsWithDecodedDocs = expenseReports.map(report => ({
        ...report.dataValues,
        document: report.document ? Buffer.from(report.document, 'base64').toString() : null,
      }));

      return res.status(200).json(reportsWithDecodedDocs);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching ExpenseReports', error: error.message });
    }
  },
};

module.exports = expenseReportController;
