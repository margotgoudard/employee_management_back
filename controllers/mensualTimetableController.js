const MensualTimetableSheet = require('../models/MensualTimetableSheet');
const DailyTimetableSheet = require('../models/DailyTimetableSheet');
const TimeSlot = require('../models/TimeSlot');
const ExpenseReport = require('../models/ExpenseReport');
const { calculateWorkedHours } = require('../controllers/dailyTimetableController');
const { createAudit } = require('./auditController');
const { handleMensualTimetableNotification } = require('../controllers/notificationController')

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
      const userId = req.auth.userId;

      const mensualTimetable = await MensualTimetableSheet.create({
        id_user, month, year, comment, commission, status
      });

      await createAudit({
        table_name: 'mensual_timetable_sheet',
        action: 'CREATE',
        old_values: null,
        new_values: mensualTimetable.dataValues,
        userId,
      });

      return res.status(201).json({
        message: 'MensualTimetableSheet created successfully',
        mensualTimetable,
      });
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
          return res.status(200).json([]);
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

  updateMensualTimetableSheet: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, comment, commission } = req.body;
      const userId = req.auth.userId;

      const timetable = await MensualTimetableSheet.findByPk(id);
      if (!timetable) {
        return res.status(404).json({ message: 'Mensual timetable sheet not found' });
      }

      const oldValues = { ...timetable.dataValues };
      await timetable.update({ status, comment, commission });
      await handleMensualTimetableNotification({
        status,
        id_user: timetable.id_user,
        timetable,
        userId,
      });
      await createAudit({
        table_name: 'mensual_timetable_sheet',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: timetable.dataValues,
        userId,
      });

      return res.status(200).json({ message: 'Mensual timetable sheet updated successfully', timetable });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating mensual timetable sheet', error });
    }
  },

  
  deleteMensualTimetable: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.auth.userId;

      const mensualTimetable = await MensualTimetableSheet.findByPk(id);
      if (!mensualTimetable) {
        return res.status(404).json({ message: 'MensualTimetableSheet not found' });
      }

      const oldValues = { ...mensualTimetable.dataValues };

      await mensualTimetable.destroy();

      await createAudit({
        table_name: 'mensual_timetable_sheet',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({
        message: 'MensualTimetableSheet deleted successfully',
      });
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
  },

  getMensualTimetableWorkedHours: async (req, res) => {
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
      console.error('Mensual timetable not found.');
      return;
    }

    const dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée');
    const totalHours = dailyTimetablesTravaille.reduce((total, daily) => {
      return total + daily.timeSlots.reduce((subTotal, slot) => {
        if (slot.status != 'Travaillé') return subTotal;
        const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
        return subTotal + duration;
      }, 0);
    }, 0);

    return res.status(200).json(totalHours);
  },

  getLastMensualTimetable: async (req, res) => {
    try {
      const { id } = req.params;
      const lastMensualTimetable = await MensualTimetableSheet.findOne({
        where: { id_user: id },
        order: [['year', 'DESC'], ['month', 'DESC']],
      });
    
      return res.status(200).json(lastMensualTimetable);
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching Last Mensual Timetable', error });
    }
  }
};

module.exports = mensualTimetableController;
