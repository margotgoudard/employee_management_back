const Document = require('../models/Document');
const Category = require('../models/Category');

const documentController = {

    createDocument: async (req, res) => {
    try {
      const { name, id_cat } = req.body;

      if (!name || !id_cat) {
        return res.status(400).json({ message: 'Name and Category ID are required' });
      }

      const category = await Category.findByPk(id_cat);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      let document = null;
      if (req.file) {
        document = req.file.buffer; 
      } else {
        return res.status(400).json({ message: 'Document file is required' });
      }

      const newDocument = await Document.create({ name, id_cat, document });
      return res.status(201).json({ message: 'Document created successfully', document: newDocument });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating document', error });
    }
  },

  getDocuments: async (req, res) => {
    try {
      const documents = await Document.findAll({
        include: {
          model: Category,
          as: 'category',
          attributes: ['id_category', 'name'],
        },
      });

      const result = documents.map((doc) => ({
        id_doc: doc.id_doc,
        name: doc.name,
        id_cat: doc.id_cat,
        category: doc.category,
        document: doc.document ? doc.document.toString('base64') : null,
      }));

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching documents', error });
    }
  },

  getDocumentById: async (req, res) => {
    try {
      const { id } = req.params;
      const document = await Document.findByPk(id, {
        include: {
          model: Category,
          as: 'category',
          attributes: ['id_category', 'name'],
        },
      });

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const result = {
        id_doc: document.id_doc,
        name: document.name,
        id_cat: document.id_cat,
        category: document.category,
        document: document.document ? document.document.toString('base64') : null,
      };

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching document', error });
    }
  },

  updateDocument: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, id_cat } = req.body;

      const document = await Document.findByPk(id);

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      if (id_cat) {
        const category = await Category.findByPk(id_cat);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
      }

      let updatedDocument = document.document;
      if (req.file) {
        updatedDocument = req.file.buffer;
      }

      await document.update({ name, id_cat, document: updatedDocument });
      return res.status(200).json({ message: 'Document updated successfully', document });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating document', error });
    }
  },

  deleteDocument: async (req, res) => {
    try {
      const { id } = req.params;

      const document = await Document.findByPk(id);

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      await document.destroy();
      return res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting document', error });
    }
  },
};

module.exports = documentController;
