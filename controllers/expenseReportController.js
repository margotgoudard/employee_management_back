const ExpenseReport = require('../models/ExpenseReport');

const expenseReportController = {

  createExpenseReport: async (req, res) => {
    try {
      const { id_daily_timetable, id_fee_category, amount, document, client, motive } = req.body;
      
      // Validation des données
      if (!id_daily_timetable || !id_fee_category || !amount) {
        return res.status(400).json({ message: 'Missing required fields: id_daily_timetable, id_fee_category, or amount' });
      }

      const expenseReport = await ExpenseReport.create({
        id_daily_timetable,
        id_fee_category,
        amount,
        document,
        client,
        motive,
      });

      return res.status(201).json({ message: 'ExpenseReport created successfully', expenseReport });
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

      return res.status(200).json(expenseReports);
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
      return res.status(200).json(expenseReport);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching ExpenseReport', error });
    }
  },

  updateExpenseReport: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_daily_timetable, amount, document, client, motive } = req.body;
      const expenseReport = await ExpenseReport.findByPk(id);
      if (!expenseReport) {
        return res.status(404).json({ message: 'ExpenseReport not found' });
      }
      await expenseReport.update({ id_daily_timetable, amount, document, client, motive });
      return res.status(200).json({ message: 'ExpenseReport updated successfully', expenseReport });
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
