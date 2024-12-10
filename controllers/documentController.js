const Document = require('../models/Document');
const Category = require('../models/Category');
const User = require('../models/User');

const documentController = {
    createDocument: async (req, res) => {
        try {
          const { name, id_category, id_user } = req.body;
      
          if (!name || !id_category || !id_user) {
            return res.status(400).json({
              message: 'Name, Category ID, and User ID are required',
            });
          }
      
          const category = await Category.findByPk(id_category);
          if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }
      
          const user = await User.findByPk(id_user);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          let document = null;
          if (req.file) {
            document = req.file.buffer; 
          } else {
            return res.status(400).json({ message: 'Document file is required' });
          }
      
          const newDocument = await Document.create({ name, id_category, id_user, document });
      
          const base64Document = document.toString('base64');
      
          return res.status(201).json({
            message: 'Document created successfully',
            document: {
              id_document: newDocument.id_document,
              name: newDocument.name,
              id_category: newDocument.id_category,
              id_user: newDocument.id_user,
              document: base64Document,
            },
          });
        } catch (error) {
          return res.status(500).json({ message: 'Error creating document', error });
        }
      },      

  getDocuments: async (req, res) => {
    try {
      const documents = await Document.findAll({
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id_category', 'name'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id_user', 'first_name', 'last_name'],
          },
        ],
      });

      const result = documents.map((doc) => ({
        id_document: doc.id_document,
        name: doc.name,
        id_category: doc.id_category,
        category: doc.category,
        id_user: doc.id_user,
        user: doc.user,
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
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id_category', 'name'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id_user', 'first_name', 'last_name'],
          },
        ],
      });

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const result = {
        id_document: document.id_document,
        name: document.name,
        id_category: document.id_category,
        category: document.category,
        id_user: document.id_user,
        user: document.user,
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
      const { name, id_category, id_user } = req.body;

      const document = await Document.findByPk(id);

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      if (id_category) {
        const category = await Category.findByPk(id_category);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
      }

      if (id_user) {
        const user = await User.findByPk(id_user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      }

      let updatedDocument = document.document;
      if (req.file) {
        updatedDocument = req.file.buffer;
      }

      await document.update({ name, id_category, id_user, document: updatedDocument });
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

  getDocumentsByCategory: async (req, res) => {
    try {
      const { id_category } = req.params;
  
      const category = await Category.findByPk(id_category);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const documents = await Document.findAll({
        where: { id_category },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id_user', 'first_name', 'last_name'],
          },
        ],
      });
  
      const result = documents.map((doc) => ({
        id_document: doc.id_document,
        name: doc.name,
        id_category: doc.id_category,
        id_user: doc.id_user,
        user: doc.user,
        document: doc.document ? doc.document.toString('base64') : null,
      }));
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching documents by category', error });
    }
  },
  
  getDocumentsByUser: async (req, res) => {
    try {
      const { id_user } = req.params;
  
      const user = await User.findByPk(id_user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const documents = await Document.findAll({
        where: { id_user },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id_category', 'name'],
          },
        ],
      });
  
      const result = documents.map((doc) => ({
        id_document: doc.id_document,
        name: doc.name,
        id_category: doc.id_category,
        category: doc.category,
        id_user: doc.id_user,
        document: doc.document ? doc.document.toString('base64') : null,
      }));
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching documents by user', error });
    }
  },

  getDocumentsByCategoryAndUser: async (req, res) => {
    try {
      const { id_category, id_user } = req.params; 
  
      const whereConditions = {};
      if (id_category) whereConditions.id_category = id_category;
      if (id_user) whereConditions.id_user = id_user;
  
      const documents = await Document.findAll({
        where: whereConditions,
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id_category', 'name'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id_user', 'first_name', 'last_name'],
          },
        ],
      });
  
      const result = documents.map((doc) => ({
        id_document: doc.id_document,
        name: doc.name,
        id_category: doc.id_category,
        category: doc.category,
        id_user: doc.id_user,
        user: doc.user,
        document: doc.document ? doc.document.toString('base64') : null,
      }));
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching documents by category and user', error });
    }
  },
  
};

module.exports = documentController;
