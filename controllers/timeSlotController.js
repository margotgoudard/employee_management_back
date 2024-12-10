const TimeSlot = require('../models/TimeSlot');

const timeSlotController = {

  createTimeSlot: async (req, res) => {
    try {
      const { id_daily_time, id_place_category, start, end } = req.body;
      const timeSlot = await TimeSlot.create({ id_daily_time, id_place_category, start, end });
      return res.status(201).json({ message: 'TimeSlot created successfully', timeSlot });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating TimeSlot', error });
    }
  },

  getTimeSlots: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID timesheet is required' });
      }

      const timeSlots = await TimeSlot.findAll({
        where: { id_daily_time: id },
      });

      if (!timeSlots || timeSlots.length === 0) {
        return res.status(404).json({ message: 'No TimeSlots found for the given ID' });
      }

      return res.status(200).json(timeSlots);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching TimeSlots', error });
    }
  },

  getTimeSlotById: async (req, res) => {
    try {
      const { id } = req.params;
      const timeSlot = await TimeSlot.findByPk(id);
      if (!timeSlot) {
        return res.status(404).json({ message: 'TimeSlot not found' });
      }
      return res.status(200).json(timeSlot);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching TimeSlot', error });
    }
  },

  updateTimeSlot: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_daily_time, id_place_category, start, end } = req.body;
      const timeSlot = await TimeSlot.findByPk(id);
      if (!timeSlot) {
        return res.status(404).json({ message: 'TimeSlot not found' });
      }
      await timeSlot.update({ id_daily_time, id_place_category, start, end });
      return res.status(200).json({ message: 'TimeSlot updated successfully', timeSlot });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating TimeSlot', error });
    }
  },

  deleteTimeSlot: async (req, res) => {
    try {
      const { id } = req.params;
      const timeSlot = await TimeSlot.findByPk(id);
      if (!timeSlot) {
        return res.status(404).json({ message: 'TimeSlot not found' });
      }
      await timeSlot.destroy();
      return res.status(200).json({ message: 'TimeSlot deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting TimeSlot', error });
    }
  },
};

module.exports = timeSlotController;
