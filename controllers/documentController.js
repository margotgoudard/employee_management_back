const Document = require('../models/Document');
const DocumentCategory = require('../models/DocumentCategory');
const User = require('../models/User');
const { createAudit } = require('./auditController.js');

const documentController = {
    createDocument: async (req, res) => {
        try {
            const { name, id_document_category, id_user } = req.body;

            if (!name || !id_document_category || !id_user) {
                return res.status(400).json({
                    message: 'Name, DocumentCategory ID, and User ID are required',
                });
            }

            const Documentcategory = await DocumentCategory.findByPk(id_document_category);
            if (!Documentcategory) {
                return res.status(404).json({ message: 'DocumentCategory not found' });
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

            const newDocument = await Document.create({ name, id_document_category, id_user, document });

            const base64Document = document.toString('base64');

            await createAudit({
                table_name: 'document',
                action: 'CREATE',
                old_values: null, 
                new_values: {
                    name: newDocument.name,
                    id_document_category: newDocument.id_document_category,
                    id_user: newDocument.id_user,
                },
                userId: req.auth.userId,
            });

            return res.status(201).json({
                message: 'Document created successfully',
                document: {
                    id_document: newDocument.id_document,
                    name: newDocument.name,
                    id_document_category: newDocument.id_document_category,
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
                      model: DocumentCategory,
                      as: 'documentCategory',
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
              id_document_category: doc.id_document_category,
              documentCategory: doc.documentCategory, 
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
            const { id_document } = req.params;
            const document = await Document.findByPk(id_document, {
                include: [
                    {
                        model: DocumentCategory,
                        as: 'documentCategory',
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
                id_document_category: document.id_document_category,
                documentCategory: document.Documentcategory,
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
            const { id_document } = req.params;
            const { name, id_document_category, id_user } = req.body;

            const document = await Document.findByPk(id_document);

            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            const oldValues = {
                name: document.name,
                id_document_category: document.id_document_category,
                id_user: document.id_user,
            };

            if (id_document_category) {
                const Documentcategory = await DocumentCategory.findByPk(id_document_category);
                if (!Documentcategory) {
                    return res.status(404).json({ message: 'DocumentCategory not found' });
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

            await document.update({ name, id_document_category, id_user, document: updatedDocument });

            await createAudit({
                table_name: 'document',
                action: 'UPDATE',
                old_values: oldValues,
                new_values: { name, id_document_category, id_user },
                userId: req.auth.userId,
            });

            return res.status(200).json({ message: 'Document updated successfully', document });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating document', error });
        }
    },

    deleteDocument: async (req, res) => {
        try {
            const { id_document } = req.params;

            const document = await Document.findByPk(id_document);

            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            const oldValues = {
                name: document.name,
                id_document_category: document.id_document_category,
                id_user: document.id_user,
            };

            await document.destroy();

            await createAudit({
                table_name: 'document',
                action: 'DELETE',
                old_values: oldValues,
                new_values: null,
                userId: req.auth.userId,
            });

            return res.status(200).json({ message: 'Document deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting document', error });
        }
    },

    getDocumentsByDocumentCategory: async (req, res) => {
        try {
            const { id_category } = req.params;

            const Documentcategory = await DocumentCategory.findByPk(id_category);
            if (!Documentcategory) {
                return res.status(404).json({ message: 'DocumentCategory not found' });
            }

            const documents = await Document.findAll({
                where: { id_document_category: id_category },
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
                id_document_category: doc.id_document_category,
                id_user: doc.id_user,
                user: doc.user,
                document: doc.document ? doc.document.toString('base64') : null,
            }));

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching documents by Documentcategory', error });
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
                where: { id_user: id_user},
                include: [
                    {
                        model: DocumentCategory,
                        as: 'documentCategory',
                        attributes: ['id_category', 'name'],
                    },
                ],
            });

            const result = documents.map((doc) => ({
                id_document: doc.id_document,
                name: doc.name,
                id_document_category: doc.id_document_category,
                documentCategory: doc.documentCategory,
                id_user: doc.id_user,
                document: doc.document ? doc.document.toString('base64') : null,
            }));

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching documents by user', error });
        }
    },

    getDocumentsByDocumentCategoryAndUser: async (req, res) => {
        try {
            const { id_document_category, id_user } = req.params; 

            const whereConditions = {};
            if (id_document_category) whereConditions.id_document_category = id_document_category;
            if (id_user) whereConditions.id_user = id_user;

            const documents = await Document.findAll({
                where: whereConditions,
                include: [
                    {
                        model: DocumentCategory,
                        as: 'documentCategory',
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
                id_document_category: doc.id_document_category,
                documentCategory: doc.documentCategory,
                id_user: doc.id_user,
                user: doc.user,
                document: doc.document ? doc.document.toString('base64') : null,
            }));

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching documents by Documentcategory and user', error });
        }
    },
};

module.exports = documentController;
