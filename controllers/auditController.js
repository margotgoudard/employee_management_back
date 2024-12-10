const Audit = require('../models/Audit');
const User = require('../models/User'); 

const auditController = {
  createAudit: async (req, res) => {
    try {
      const { table_name, action, old_values, new_values, id_user } = req.body;

      const user = await User.findByPk(id_user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const audit = await Audit.create({
        table_name,
        action,
        old_values,
        new_values,
        id_user,
      });

      return res.status(201).json({ message: 'Audit created successfully', audit });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating audit', error });
    }
  },

  getAudits: async (req, res) => {
    try {
        const audits = await Audit.findAll();
        return res.status(200).json(audits);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching audits', error });
    }
  },

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

  updateAudit: async (req, res) => {
    try {
      const { id } = req.params;
      const { table_name, action, old_values, new_values, id_user } = req.body;

      const audit = await Audit.findByPk(id);

      if (!audit) {
        return res.status(404).json({ message: 'Audit not found' });
      }

      if (id_user) {
        const user = await User.findByPk(id_user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      }

      await audit.update({
        table_name,
        action,
        old_values,
        new_values,
        id_user,
      });

      return res.status(200).json({ message: 'Audit updated successfully', audit });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating audit', error });
    }
  },

  deleteAudit: async (req, res) => {
    try {
      const { id } = req.params;

      const audit = await Audit.findByPk(id);

      if (!audit) {
        return res.status(404).json({ message: 'Audit not found' });
      }

      await audit.destroy();

      return res.status(200).json({ message: 'Audit deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting audit', error });
    }
  },
};

module.exports = auditController;
