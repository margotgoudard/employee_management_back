const MensualTimetableSheet = require('../models/MensualTimetableSheet');
const DailyTimetableSheet = require('../models/DailyTimetableSheet'); 
const TimeSlot = require('../models/TimeSlot');
const ExpenseReport = require('../models/ExpenseReport');
const { calculateWorkedHours } = require('../controllers/dailyTimetableController')





// Fonction pour calculer le total des notes de frais d'un mois
const calculateTotalExpenseNotes = (dailyTimetables) => {
  let totalExpenseNotes = 0;
  dailyTimetables.forEach(dailyTimetable => {
    dailyTimetable.expenseReports.forEach(expenseReport => {
      totalExpenseNotes += expenseReport.amount || 0;
    });
  });
  return totalExpenseNotes;
};

const mensualTimetableController = {

  createMensualTimetable: async (req, res) => {
    try {
      const { id_user, month, year, comment, commission, status } = req.body;
      const mensualTimetable = await MensualTimetableSheet.create({
        id_user, month, year, comment, commission, status
      });
      return res.status(201).json({ message: 'MensualTimetableSheet created successfully', mensualTimetable });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating MensualTimetableSheet', error });
    }
  },

  getMensualTimetables: async (req, res) => {
    try {
        const { id } = req.params; 
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const mensualTimetables = await MensualTimetableSheet.findAll({
            where: { id_user: id },
        });
        if (mensualTimetables.length === 0) {
            return res.status(404).json({ message: 'No MensualTimetable found for the given User ID' });
        }
        return res.status(200).json(mensualTimetables); 
    } catch (error) {
        console.error('Error fetching MensualTimetables:', error); 
        return res.status(500).json({ message: 'Error fetching MensualTimetables', error });
    }
 },



  getMensualTimetableById: async (req, res) => {
    try {
      const { id } = req.params;
      const mensualTimetable = await MensualTimetableSheet.findByPk(id);
      if (!mensualTimetable) {
        return res.status(404).json({ message: 'MensualTimetableSheet not found' });
      }
      return res.status(200).json(mensualTimetable);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching MensualTimetableSheet', error });
    }
  },

  updateMensualTimetable: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_user, month, year, comment, commission, status } = req.body;
      const mensualTimetable = await MensualTimetableSheet.findByPk(id);
      if (!mensualTimetable) {
        return res.status(404).json({ message: 'MensualTimetableSheet not found' });
      }
      await mensualTimetable.update({ id_user, month, year, comment, commission, status });
      return res.status(200).json({ message: 'MensualTimetableSheet updated successfully', mensualTimetable });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating MensualTimetableSheet', error });
    }
  },

  deleteMensualTimetable: async (req, res) => {
    try {
      const { id } = req.params;
      const mensualTimetable = await MensualTimetableSheet.findByPk(id);
      if (!mensualTimetable) {
        return res.status(404).json({ message: 'MensualTimetableSheet not found' });
      }
      await mensualTimetable.destroy();
      return res.status(200).json({ message: 'MensualTimetableSheet deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting MensualTimetableSheet', error });
    }
  },


  getMensualDailyTimeSlot: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Timetable ID is required' });
      }
      const mensualTimetable = await MensualTimetableSheet.findOne({
        where: { id_timetable: id },
        include: [
          {
            model: DailyTimetableSheet,
            as: 'dailyTimetables',
            include: [
              {
                model: TimeSlot,
                as: 'timeSlots',
              },
            ],
          },
        ],
      });
  
      if (!mensualTimetable) {
        return res.status(404).json({ message: 'Mensual Timetable not found' });
      }
  
      return res.status(200).json(mensualTimetable);
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Error fetching data', error });
    }
  },


  getMensualTimetableWithDetails: async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: 'Mensual Timetable ID is required' });
      }
  
      const mensualTimetable = await MensualTimetableSheet.findOne({
        where: { id_timetable: id },
        include: [
          {
            model: DailyTimetableSheet,
            as: 'dailyTimetableList',
            include: [
              {
                model: TimeSlot,
                as: 'timeSlots',
              },
              {
                model: ExpenseReport,
                as: 'expenseReports',
              },
            ],
          },
        ],
      });
  
      if (!mensualTimetable) {
        return res.status(404).json({ message: 'Mensual Timetable not found' });
      }

      const totalWorkedHours = mensualTimetable.dailyTimetableList.reduce((total, dailyTimetable) => {
        if (dailyTimetable.status === 'Travaillé') {
          return total + calculateWorkedHours(dailyTimetable.timeSlots);
        } else if (dailyTimetable.status === 'Demi-journée') {
          const workedTimeSlots = dailyTimetable.timeSlots.filter(ts => ts.status === 'Travaillé');
          return total + calculateWorkedHours(workedTimeSlots);
        }
        return total; 
      }, 0);
  
      const totalExpenseNotes = mensualTimetable.dailyTimetableList.reduce((total, dailyTimetable) => {
        return total + calculateTotalExpenseNotes(dailyTimetable.expenseReports);
      }, 0);
  
      return res.status(200).json({
        mensualTimetable,
        totalWorkedHours: totalWorkedHours.toFixed(2), 
        totalExpenseNotes: totalExpenseNotes.toFixed(2), 
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching Mensual Timetable with details', error });
    }
  }
  
  
};

module.exports = mensualTimetableController;
