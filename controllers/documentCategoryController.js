const DocumentCategory = require('../models/DocumentCategory');
const { createAudit } = require('./auditController.js');

const documentCategoryController = {

  createDocumentCategory: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const documentCategory = await DocumentCategory.create({ name });

      await createAudit({
        table_name: 'document_category',
        action: 'CREATE',
        old_values: null,
        new_values: { name: documentCategory.name },
        userId: req.auth.userId,
      });

      return res.status(201).json({ message: 'DocumentCategory created successfully', documentCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating DocumentCategory', error });
    }
  },

  getDocumentCategories: async (req, res) => {
    try {
      const categories = await DocumentCategory.findAll();

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching categories', error });
    }
  },

  getDocumentCategoryById: async (req, res) => {
    try {
      const { id_document_category } = req.params;

      const documentCategory = await DocumentCategory.findByPk(id_document_category);

      if (!documentCategory) {
        return res.status(404).json({ message: 'DocumentCategory not found' });
      }
      return res.status(200).json(documentCategory);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching DocumentCategory', error });
    }
  },

  updateDocumentCategory: async (req, res) => {
    try {
      const { id_document_category } = req.params;
      const { name } = req.body;

      const documentCategory = await DocumentCategory.findByPk(id_document_category);

      if (!documentCategory) {
        return res.status(404).json({ message: 'DocumentCategory not found' });
      }

      const oldValues = { name: documentCategory.name };

      await documentCategory.update({ name });

      await createAudit({
        table_name: 'document_category',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: { name: documentCategory.name },
        userId: req.auth.userId, 
      });

      return res.status(200).json({ message: 'DocumentCategory updated successfully', documentCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating DocumentCategory', error });
    }
  },

  deleteDocumentCategory: async (req, res) => {
    try {
      const { id_document_category } = req.params;

      const documentCategory = await DocumentCategory.findByPk(id_document_category);

      if (!documentCategory) {
        return res.status(404).json({ message: 'DocumentCategory not found' });
      }

      const oldValues = { name: documentCategory.name };

      await documentCategory.destroy();

      await createAudit({
        table_name: 'document_category',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId: req.auth.userId, 
      });

      return res.status(200).json({ message: 'DocumentCategory deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting DocumentCategory', error });
    }
  },
};

module.exports = documentCategoryController;
