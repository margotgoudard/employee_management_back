const FeeCategory = require('../models/FeeCategory');
const { createAudit } = require('../controllers/auditController'); 

const feeCategoryController = {

  createFeeCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.auth.userId; 

      const feeCategory = await FeeCategory.create({ name });

      await createAudit({
        table_name: 'fee_category',
        action: 'CREATE',
        old_values: null,
        new_values: feeCategory.dataValues,
        userId,
      });

      return res.status(201).json({ message: 'FeeCategory created successfully', feeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating FeeCategory', error });
    }
  },

  getFeeCategories: async (req, res) => {
    try {
      const feeCategories = await FeeCategory.findAll();

      return res.status(200).json(feeCategories);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching FeeCategories', error });
    }
  },

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

  updateFeeCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const userId = req.auth.userId;

      const feeCategory = await FeeCategory.findByPk(id);

      if (!feeCategory) {
        return res.status(404).json({ message: 'FeeCategory not found' });
      }

      const oldValues = { ...feeCategory.dataValues };

      await feeCategory.update({ name });

      await createAudit({
        table_name: 'fee_category',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: feeCategory.dataValues,
        userId,
      });

      return res.status(200).json({ message: 'FeeCategory updated successfully', feeCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating FeeCategory', error });
    }
  },

  deleteFeeCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.auth.userId;

      const feeCategory = await FeeCategory.findByPk(id);

      if (!feeCategory) {
        return res.status(404).json({ message: 'FeeCategory not found' });
      }

      const oldValues = { ...feeCategory.dataValues };

      await feeCategory.destroy();

      await createAudit({
        table_name: 'fee_category',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({ message: 'FeeCategory deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting FeeCategory', error });
    }
  },
};

module.exports = feeCategoryController;
