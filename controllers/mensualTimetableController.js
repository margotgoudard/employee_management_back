const MensualTimetableSheet = require('../models/MensualTimetableSheet');

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
        const { id } = req.params; // Récupérer l'id de l'utilisateur depuis les paramètres

        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Récupérer uniquement les mensualTimetables pour cet id_user sans inclure DailyTimetableSheet
        const mensualTimetables = await MensualTimetableSheet.findAll({
            where: { id_user: id }, // Filtrer par l'id de l'utilisateur
        });

        // Si aucun MensualTimetableSheet trouvé, retourner un message
        if (mensualTimetables.length === 0) {
            return res.status(404).json({ message: 'No MensualTimetable found for the given User ID' });
        }

        return res.status(200).json(mensualTimetables); // Retourner les mensualTimetables
    } catch (error) {
        console.error('Error fetching MensualTimetables:', error); // Afficher l'erreur en console pour déboguer
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
};

module.exports = mensualTimetableController;
