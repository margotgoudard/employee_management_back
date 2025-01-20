const PlaceCategory = require('../models/PlaceCategory');
const { createAudit } = require('./auditController');


const placeCategoryController = {

  createPlaceCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.auth.userId;

      const placeCategory = await PlaceCategory.create({ name });

      await createAudit({
        table_name: 'place_category',
        action: 'CREATE',
        old_values: null,
        new_values: placeCategory.dataValues,
        userId,
      });

      return res.status(201).json({ message: 'PlaceCategory created successfully', placeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating place category', error });
    }
  },

  getPlaceCategories: async (req, res) => {
    try {
      const placeCategories = await PlaceCategory.findAll();

      return res.status(200).json(placeCategories);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching place categories', error });
    }
  },

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

  updatePlaceCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const userId = req.auth.userId;

      const placeCategory = await PlaceCategory.findByPk(id);

      if (!placeCategory) {
        return res.status(404).json({ message: 'PlaceCategory not found' });
      }

      const oldValues = { ...placeCategory.dataValues };

      await placeCategory.update({ name });

      await createAudit({
        table_name: 'place_category',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: placeCategory.dataValues,
        userId,
      });

      return res.status(200).json({ message: 'PlaceCategory updated successfully', placeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating place category', error });
    }
  },

  deletePlaceCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.auth.userId;

      const placeCategory = await PlaceCategory.findByPk(id);

      if (!placeCategory) {
        return res.status(404).json({ message: 'PlaceCategory not found' });
      }

      const oldValues = { ...placeCategory.dataValues }; 

      await placeCategory.destroy();

      await createAudit({
        table_name: 'place_category',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({ message: 'PlaceCategory deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting place category', error });
    }
  },
};

module.exports = placeCategoryController;
