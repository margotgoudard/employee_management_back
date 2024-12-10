const Category = require('../models/Category');

const categoryController = {

    createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const category = await Category.create({ name });
      return res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating category', error });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching categories', error });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching category', error });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await category.update({ name });
      return res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating category', error });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await category.destroy();
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting category', error });
    }
  },
};

module.exports = categoryController;
