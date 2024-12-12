const DailyTimetableSheet = require('../models/DailyTimetableSheet');
const TimeSlot = require('../models/TimeSlot');
const sequelize = require('../config/sequelize')

const dailyTimetableController = {
  
  createDailyTimetable: async (req, res) => {
    try {
      const { id_timetable, day, status, comment, on_call_duty, is_completed } = req.body;

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

      if (dailyTimetables.length === 0) {
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

      const dailyTimetable = await DailyTimetableSheet.findByPk(id);

      if (!dailyTimetable) {
        return res.status(404).json({ message: 'DailyTimetableSheet not found' });
      }

      await dailyTimetable.update({
        id_timetable,
        day,
        status,
        comment,
        on_call_duty,
        is_completed,
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

  deleteDailyTimetable: async (req, res) => {
    try {
      const { id } = req.params;

      const dailyTimetable = await DailyTimetableSheet.findByPk(id);

      if (!dailyTimetable) {
        return res.status(404).json({ message: 'DailyTimetableSheet not found' });
      }
      await dailyTimetable.destroy();

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
      const { id } = req.params; // L'id du DailyTimetableSheet passé dans l'URL

      if (!id) {
        return res.status(400).json({ message: 'Daily Timetable ID is required' });
      }

      // Vérifier si le statut de la journée est "travaillé"
      const dailyTimetable = await DailyTimetableSheet.findByPk(id);
      if (!dailyTimetable) {
        return res.status(404).json({ message: 'Daily Timetable not found' });
      }

      if (dailyTimetable.status !== 'Travaillé') {
        return res.status(400).json({ message: 'The day is not worked' });
      }

      // Calculer la durée totale en heures
      const timeSlots = await TimeSlot.findAll({
        where: {
          id_daily_time: id,
        },
      });

      // Vérifier s'il y a des timeSlots et calculer la durée totale
      if (!timeSlots.length) {
        return res.status(200).json({ message: 'No worked hours found', totalWorkedHours: 0 });
      }

      let totalWorkedSeconds = 0;
      timeSlots.forEach(slot => {
        const startTime = new Date(`1970-01-01T${slot.start}Z`);
        const endTime = new Date(`1970-01-01T${slot.end}Z`);
        totalWorkedSeconds += (endTime - startTime) / 1000; // Calcul de la différence en secondes
      });

      // Convertir en heures
      const totalWorkedHours = totalWorkedSeconds / 3600; // Convertir en heures

      return res.status(200).json({
        message: `Total worked hours: ${totalWorkedHours.toFixed(2)} hours`,
        totalWorkedHours,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error calculating worked hours', error });
    }
  },


};

module.exports = dailyTimetableController;
