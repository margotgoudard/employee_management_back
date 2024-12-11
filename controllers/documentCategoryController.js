const DocumentCategory = require('../models/DocumentCategory');

const documentCategoryController = {

    createDocumentCategory: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const Documentcategory = await DocumentCategory.create({ name });
      return res.status(201).json({ message: 'DocumentCategory created successfully', Documentcategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating Documentcategory', error });
    }
  },

  getDocumentCategories: async (req, res) => {
    try {
      const categories = await DocumentCategory.findAll();
      console.log(categories)

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching categories', error });
    }
  },

  getDocumentCategoryById: async (req, res) => {
    try {
      const { id_Documentcategory } = req.params;

      const Documentcategory = await DocumentCategory.findByPk(id_Documentcategory);

      if (!Documentcategory) {
        return res.status(404).json({ message: 'DocumentCategory not found' });
      }

      return res.status(200).json(Documentcategory);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching Documentcategory', error });
    }
  },

  updateDocumentCategory: async (req, res) => {
    try {
      const { id_Documentcategory } = req.params;
      const { name } = req.body;

      const Documentcategory = await DocumentCategory.findByPk(id_Documentcategory);

      if (!Documentcategory) {
        return res.status(404).json({ message: 'DocumentCategory not found' });
      }

      await Documentcategory.update({ name });
      return res.status(200).json({ message: 'DocumentCategory updated successfully', Documentcategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating Documentcategory', error });
    }
  },

  deleteDocumentCategory: async (req, res) => {
    try {
      const { id_Documentcategory } = req.params;

      const Documentcategory = await DocumentCategory.findByPk(id_Documentcategory);

      if (!Documentcategory) {
        return res.status(404).json({ message: 'DocumentCategory not found' });
      }

      await Documentcategory.destroy();
      return res.status(200).json({ message: 'DocumentCategory deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting Documentcategory', error });
    }
  },
};

module.exports = documentCategoryController;
