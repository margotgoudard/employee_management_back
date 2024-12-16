const TimeSlot = require('../models/TimeSlot');

const timeSlotController = {
  // Créer un nouveau TimeSlot
  createTimeSlot: async (req, res) => {
    try {
      const {
        id_daily_time,
        id_place_category,
        status,
        start,
        end,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
      } = req.body;

      // Vérification des champs obligatoires
      if (!id_daily_time || !id_place_category || !status || !start || !end) {
        return res.status(400).json({
          message: 'Les champs id_daily_time, id_place_category, status, start et end sont obligatoires',
        });
      }

      const timeSlot = await TimeSlot.create({
        id_daily_time,
        id_place_category,
        status,
        start,
        end,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
      });

      return res.status(201).json({ message: 'TimeSlot créé avec succès', timeSlot });
    } catch (error) {
      console.error('Erreur lors de la création du TimeSlot:', error);
      return res.status(500).json({ message: 'Erreur lors de la création du TimeSlot', error });
    }
  },

  // Récupérer tous les TimeSlots pour un id_daily_time donné
  getTimeSlots: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "L'ID du daily_time est requis" });
      }

      const timeSlots = await TimeSlot.findAll({
        where: { id_daily_time: id },
      });

      if (!timeSlots || timeSlots.length === 0) {
        return res.status(404).json({ message: 'Aucun TimeSlot trouvé pour cet ID' });
      }

      return res.status(200).json(timeSlots);
    } catch (error) {
      console.error('Erreur lors de la récupération des TimeSlots:', error);
      return res.status(500).json({ message: 'Erreur lors de la récupération des TimeSlots', error });
    }
  },

  // Récupérer un TimeSlot par son ID
  getTimeSlotById: async (req, res) => {
    try {
      const { id } = req.params;

      const timeSlot = await TimeSlot.findByPk(id);
      if (!timeSlot) {
        return res.status(404).json({ message: 'TimeSlot introuvable' });
      }

      return res.status(200).json(timeSlot);
    } catch (error) {
      console.error('Erreur lors de la récupération du TimeSlot:', error);
      return res.status(500).json({ message: 'Erreur lors de la récupération du TimeSlot', error });
    }
  },

  // Mettre à jour un TimeSlot par son ID
  updateTimeSlot: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        id_daily_time,
        id_place_category,
        status,
        start,
        end,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
      } = req.body;

      const timeSlot = await TimeSlot.findByPk(id);
      if (!timeSlot) {
        return res.status(404).json({ message: 'TimeSlot introuvable' });
      }

      // Mise à jour des champs
      await timeSlot.update({
        id_daily_time,
        id_place_category,
        status,
        start,
        end,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
      });

      return res.status(200).json({ message: 'TimeSlot mis à jour avec succès', timeSlot });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du TimeSlot:', error);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du TimeSlot', error });
    }
  },

  // Supprimer un TimeSlot par son ID
  deleteTimeSlot: async (req, res) => {
    try {
      const { id } = req.params;

      const timeSlot = await TimeSlot.findByPk(id);
      if (!timeSlot) {
        return res.status(404).json({ message: 'TimeSlot introuvable' });
      }

      await timeSlot.destroy();
      return res.status(200).json({ message: 'TimeSlot supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du TimeSlot:', error);
      return res.status(500).json({ message: 'Erreur lors de la suppression du TimeSlot', error });
    }
  },
};

module.exports = timeSlotController;
