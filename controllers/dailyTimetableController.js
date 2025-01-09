const DailyTimetableSheet = require('../models/DailyTimetableSheet');
const TimeSlot = require('../models/TimeSlot');
const sequelize = require('../config/sequelize');
const { createAudit } = require('./auditController'); 

// Fonction pour calculer le nombre d'heures travaillées sur un jour
const calculateWorkedHours = (timeSlots) => {
  let totalWorkedSeconds = 0;

  timeSlots.forEach((slot) => {
    const startTime = new Date(`1970-01-01T${slot.start}Z`);
    const endTime = new Date(`1970-01-01T${slot.end}Z`);
    totalWorkedSeconds += (endTime - startTime) / 1000;
  });
  return totalWorkedSeconds / 3600;
};

const dailyTimetableController = {
  
  createDailyTimetable: async (req, res) => {
    try {
      const { id_timetable, day, status, comment, on_call_duty, is_completed } = req.body;
      const userId = req.auth.userId;

      if (!id_timetable || !day || !status) {
        return res.status(400).json({ message: 'id_timetable, day, and status are required' });
      }

      const dailyTimetable = await DailyTimetableSheet.create({
        id_timetable,
        day,
        status,
        comment,
        on_call_duty,
        is_completed,
      });

      await createAudit({
        table_name: 'daily_timetable_sheet',
        action: 'CREATE',
        old_values: null,
        new_values: dailyTimetable.dataValues,
        userId,
      });

      return res.status(201).json({
        message: 'DailyTimetableSheet created successfully',
        dailyTimetable,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating DailyTimetableSheet',
        error: error.message,
      });
    }
  },

  getDailyTimetablesByMensual: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'MensualTimetable ID is required' });
      }

      const dailyTimetables = await DailyTimetableSheet.findAll({
        where: { id_timetable: id },
      });

      if (!dailyTimetables.length) {
        return res.status(404).json({
          message: 'No DailyTimetables found for the given MensualTimetable ID',
        });
      }

      return res.status(200).json(dailyTimetables);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching DailyTimetables',
        error: error.message,
      });
    }
  },

  getDailyTimetableById: async (req, res) => {
    try {
      const { id } = req.params;

      const dailyTimetable = await DailyTimetableSheet.findByPk(id);

      if (!dailyTimetable) {
        return res.status(404).json({ message: 'DailyTimetableSheet not found' });
      }

      return res.status(200).json(dailyTimetable);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching DailyTimetableSheet',
        error: error.message,
      });
    }
  },

  updateDailyTimetable: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_timetable, day, status, comment, on_call_duty, is_completed } = req.body;
      const userId = req.auth.userId;

      const dailyTimetable = await DailyTimetableSheet.findByPk(id);

      if (!dailyTimetable) {
        return res.status(404).json({ message: 'DailyTimetableSheet not found' });
      }

      const oldValues = { ...dailyTimetable.dataValues };

      await dailyTimetable.update({
        id_timetable,
        day,
        status,
        comment,
        on_call_duty,
        is_completed,
      });

      await createAudit({
        table_name: 'daily_timetable_sheet',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: dailyTimetable.dataValues,
        userId,
      });

      return res.status(200).json({
        message: 'DailyTimetableSheet updated successfully',
        dailyTimetable,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating DailyTimetableSheet',
        error: error.message,
      });
    }
  },

  // Supprimer un emploi du temps quotidien
  deleteDailyTimetable: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.auth.userId;

      const dailyTimetable = await DailyTimetableSheet.findByPk(id);

      if (!dailyTimetable) {
        return res.status(404).json({ message: 'DailyTimetableSheet not found' });
      }

      const oldValues = { ...dailyTimetable.dataValues };

      await dailyTimetable.destroy();

      await createAudit({
        table_name: 'daily_timetable_sheet',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({
        message: 'DailyTimetableSheet deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting DailyTimetableSheet',
        error: error.message,
      });
    }
  },

  getTotalWorkedHours: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'Daily Timetable ID is required' });
      }

      const dailyTimetable = await DailyTimetableSheet.findByPk(id);

      if (!dailyTimetable) {
        return res.status(404).json({ message: 'Daily Timetable not found' });
      }

      if (dailyTimetable.status !== 'Travaillé' && dailyTimetable.status !== 'Demi-journée') {
        return res.status(200).json({ message: 'No worked hours found', totalWorkedHours: 0 });
      }

      const timeSlots = await TimeSlot.findAll({
        where: {
          id_daily_timetable: id,
          status: 'Travaillé',
        },
      });

      if (!timeSlots.length) {
        return res.status(200).json({ message: 'No worked hours found', totalWorkedHours: 0 });
      }

      const totalWorkedHours = calculateWorkedHours(timeSlots);

      return res.status(200).json({
        message: `Total worked hours: ${totalWorkedHours.toFixed(2)} hours`,
        totalWorkedHours,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error calculating worked hours', error });
    }
  },
};

module.exports = dailyTimetableController;
module.exports.calculateWorkedHours = calculateWorkedHours;
