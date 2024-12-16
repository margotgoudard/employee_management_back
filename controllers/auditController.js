const Audit = require('../models/Audit');
const User = require('../models/User');

// Fonction utilitaire pour créer un audit
const createAudit = async ({ table_name, action, old_values, new_values, userId }) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await Audit.create({
      table_name,
      action,
      old_values,
      new_values,
      id_user: userId,
    });
  } catch (error) {
    console.error('Error creating audit:', error);
    throw error;
  }
};

const auditController = {
  // Créer un audit
  createAudit: async (req, res) => {
    try {
      const { table_name, action, old_values, new_values } = req.body;
      const userId = req.auth.userId;

      await createAudit({ table_name, action, old_values, new_values, userId });

      return res.status(201).json({ message: 'Audit created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating audit', error });
    }
  },

  // Récupérer tous les audits
  getAudits: async (req, res) => {
    try {
      const audits = await Audit.findAll();
      return res.status(200).json(audits);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching audits', error });
    }
  },

  // Récupérer un audit par ID
  getAuditById: async (req, res) => {
    try {
      const { id } = req.params;
      const audit = await Audit.findByPk(id);

      if (!audit) {
        return res.status(404).json({ message: 'Audit not found' });
      }

      return res.status(200).json(audit);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching audit', error });
    }
  },

  // Mettre à jour un audit
  updateAudit: async (req, res) => {
    try {
      const { id_audit } = req.params;
      const { table_name, action, old_values, new_values } = req.body;
      const userId = req.auth.userId;

      const audit = await Audit.findByPk(id_audit);
      if (!audit) {
        return res.status(404).json({ message: 'Audit not found' });
      }

      // Stocker les anciennes valeurs avant mise à jour
      const oldValues = { ...audit.dataValues };

      // Mettre à jour l'audit
      await audit.update({ table_name, action, old_values, new_values });

      // Créer un audit pour la mise à jour
      await createAudit({
        table_name: 'audit',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: audit.dataValues,
        userId,
      });

      return res.status(200).json({ message: 'Audit updated successfully', audit });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating audit', error });
    }
  },

  // Supprimer un audit
  deleteAudit: async (req, res) => {
    try {
      const { id_audit } = req.params;
      const userId = req.auth.userId;

      const audit = await Audit.findByPk(id_audit);
      if (!audit) {
        return res.status(404).json({ message: 'Audit not found' });
      }
      const oldValues = { ...audit.dataValues };
      await audit.destroy();

      await createAudit({
        table_name: 'audit',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({ message: 'Audit deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting audit', error });
    }
  },

  getAuditsByUserId: async (req, res) => {
    try {
      const { id_user } = req.params;

      const user = await User.findByPk(id_user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const audits = await Audit.findAll({ where: { id_user } });
      return res.status(200).json(audits);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching audits by user', error });
    }
  },
};

module.exports = { auditController, createAudit };
