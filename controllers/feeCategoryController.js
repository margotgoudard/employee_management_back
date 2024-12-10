const FeeCategory = require('../models/FeeCategory');

const feeCategoryController = {
    
  // Créer une catégorie de frais
  createFeeCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const feeCategory = await FeeCategory.create({ name });

      return res.status(201).json({ message: 'FeeCategory created successfully', feeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating FeeCategory', error });
    }
  },

  // Récupérer toutes les catégories de frais
  getFeeCategories: async (req, res) => {
    try {
      const feeCategories = await FeeCategory.findAll();

      return res.status(200).json(feeCategories);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching FeeCategories', error });
    }
  },

  // Récupérer une catégorie de frais par ID
  getFeeCategoryById: async (req, res) => {
    try {
      const { id } = req.params;

      const feeCategory = await FeeCategory.findByPk(id);

      if (!feeCategory) {
        return res.status(404).json({ message: 'FeeCategory not found' });
      }

      return res.status(200).json(feeCategory);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching FeeCategory', error });
    }
  },

  // Mettre à jour une catégorie de frais
  updateFeeCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const feeCategory = await FeeCategory.findByPk(id);

      if (!feeCategory) {
        return res.status(404).json({ message: 'FeeCategory not found' });
      }

      await feeCategory.update({ name });

      return res.status(200).json({ message: 'FeeCategory updated successfully', feeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating FeeCategory', error });
    }
  },

  // Supprimer une catégorie de frais
  deleteFeeCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const feeCategory = await FeeCategory.findByPk(id);

      if (!feeCategory) {
        return res.status(404).json({ message: 'FeeCategory not found' });
      }

      await feeCategory.destroy();
      return res.status(200).json({ message: 'FeeCategory deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting FeeCategory', error });
    }
  },
};

module.exports = feeCategoryController;
