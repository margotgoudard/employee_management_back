const DailyTimetableSheet = require('../models/DailyTimetableSheet');

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
};

module.exports = dailyTimetableController;
