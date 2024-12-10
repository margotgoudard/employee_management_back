const PlaceCategory = require('../models/PlaceCategory');

const placeCategoryController = {
    
  // Créer une catégorie de lieux
  createPlaceCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const placeCategory = await PlaceCategory.create({ name });

      return res.status(201).json({ message: 'PlaceCategory created successfully', placeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating place category', error });
    }
  },

  // Récupérer toutes les catégories de lieux
  getPlaceCategories: async (req, res) => {
    try {
      const placeCategories = await PlaceCategory.findAll();

      return res.status(200).json(placeCategories);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching place categories', error });
    }
  },

  // Récupérer une catégorie par ID
  getPlaceCategoryById: async (req, res) => {
    try {
      const { id } = req.params;

      const placeCategory = await PlaceCategory.findByPk(id);

      if (!placeCategory) {
        return res.status(404).json({ message: 'PlaceCategory not found' });
      }

      return res.status(200).json(placeCategory);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching place category', error });
    }
  },

  // Mettre à jour une catégorie de lieux
  updatePlaceCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const placeCategory = await PlaceCategory.findByPk(id);

      if (!placeCategory) {
        return res.status(404).json({ message: 'PlaceCategory not found' });
      }

      await placeCategory.update({ name });

      return res.status(200).json({ message: 'PlaceCategory updated successfully', placeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating place category', error });
    }
  },

  // Supprimer une catégorie de lieux
  deletePlaceCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const placeCategory = await PlaceCategory.findByPk(id);

      if (!placeCategory) {
        return res.status(404).json({ message: 'PlaceCategory not found' });
      }

      await placeCategory.destroy();
      return res.status(200).json({ message: 'PlaceCategory deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting place category', error });
    }
  },
};

module.exports = placeCategoryController;
