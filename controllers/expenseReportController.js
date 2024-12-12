const ExpenseReport = require('../models/ExpenseReport');


const expenseReportController = {

  createExpenseReport: async (req, res) => {
    try {
      const { id_daily_timetable, id_fee_category, amount, client, motive } = req.body;

      if (!id_daily_timetable || !id_fee_category || !amount) {
        return res.status(400).json({ message: 'Missing required fields: id_daily_timetable, id_fee_category, or amount' });
      }

      let document = null;
      if (req.file) {
        document = req.file.buffer;
      } else {
        return res.status(400).json({ message: 'Document file is required' });
      }

      const expenseReport = await ExpenseReport.create({
        id_daily_timetable,
        id_fee_category,
        amount,
        document,
        client,
        motive,
      });

      // Conversion du document en base64 pour l'inclure dans la réponse
      const base64Document = document.toString('base64');

      return res.status(201).json({
        message: 'ExpenseReport created successfully',
        expenseReport: {
          id_expense_report: expenseReport.id_expense_report,
          id_daily_timetable: expenseReport.id_daily_timetable,
          id_fee_category: expenseReport.id_fee_category,
          amount: expenseReport.amount,
          document: base64Document,
          client: expenseReport.client,
          motive: expenseReport.motive,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating ExpenseReport', error });
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

      if (expenseReports.length === 0) {
        return res.status(404).json({ message: 'No ExpenseReports found for the given DailyTimetable ID' });
      }

      // Convertir les documents en base64 avant de les envoyer dans la réponse
      const result = expenseReports.map((expenseReport) => ({
        id_expense_report: expenseReport.id_expense_report,
        id_daily_timetable: expenseReport.id_daily_timetable,
        id_fee_category: expenseReport.id_fee_category,
        amount: expenseReport.amount,
        document: expenseReport.document ? expenseReport.document.toString('base64') : null, // Conversion en base64
        client: expenseReport.client,
        motive: expenseReport.motive,
      }));

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching ExpenseReports', error });
    }
  },

  getExpenseReportById: async (req, res) => {
    try {
      const { id } = req.params;
      const expenseReport = await ExpenseReport.findByPk(id);
      if (!expenseReport) {
        return res.status(404).json({ message: 'ExpenseReport not found' });
      }

      const result = {
        id_expense_report: expenseReport.id_expense_report,
        id_daily_timetable: expenseReport.id_daily_timetable,
        id_fee_category: expenseReport.id_fee_category,
        amount: expenseReport.amount,
        document: expenseReport.document ? expenseReport.document.toString('base64') : null, // Conversion en base64
        client: expenseReport.client,
        motive: expenseReport.motive,
      };

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching ExpenseReport', error });
    }
  },

  updateExpenseReport: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_daily_timetable, amount, client, motive } = req.body;

      const expenseReport = await ExpenseReport.findByPk(id);
      if (!expenseReport) {
        return res.status(404).json({ message: 'ExpenseReport not found' });
      }

      
      let updatedDocument = expenseReport.document; 
      if (req.file) {
        updatedDocument = req.file.buffer; 
      }

      await expenseReport.update({
        id_daily_timetable,
        amount,
        document: updatedDocument,
        client,
        motive,
      });

      // Conversion du document mis à jour en base64
      const base64Document = updatedDocument ? updatedDocument.toString('base64') : null;

      return res.status(200).json({
        message: 'ExpenseReport updated successfully',
        expenseReport: {
          id_expense_report: expenseReport.id_expense_report,
          id_daily_timetable: expenseReport.id_daily_timetable,
          id_fee_category: expenseReport.id_fee_category,
          amount: expenseReport.amount,
          document: base64Document,
          client: expenseReport.client,
          motive: expenseReport.motive,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating ExpenseReport', error });
    }
  },

  deleteExpenseReport: async (req, res) => {
    try {
      const { id } = req.params;
      const expenseReport = await ExpenseReport.findByPk(id);
      if (!expenseReport) {
        return res.status(404).json({ message: 'ExpenseReport not found' });
      }
      await expenseReport.destroy();
      return res.status(200).json({ message: 'ExpenseReport deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting ExpenseReport', error });
    }
  },
};

module.exports = expenseReportController;
