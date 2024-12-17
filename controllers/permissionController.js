const Permission = require('../models/Permission');
const User = require('../models/User');
const { createAudit } = require('./auditController');

const permissionController = {

  // Créer une permission
  createPermission: async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.auth.userId;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const permission = await Permission.create({ name });

      await createAudit({
        table_name: 'permission',
        action: 'CREATE',
        old_values: null,
        new_values: permission.dataValues,
        userId,
      });

      return res.status(201).json({ message: 'Permission created successfully', permission });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating permission', error });
    }
  },

  // Récupérer toutes les permissions
  getPermissions: async (req, res) => {
    try {
      const permissions = await Permission.findAll();
      return res.status(200).json(permissions);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching permissions', error });
    }
  },

  // Récupérer une permission par ID
  getPermissionById: async (req, res) => {
    try {
      const { id_permission } = req.params;

      const permission = await Permission.findByPk(id_permission);

      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }

      return res.status(200).json(permission);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching permission', error });
    }
  },

  // Mettre à jour une permission
  updatePermission: async (req, res) => {
    try {
      const { id_permission } = req.params;
      const { name } = req.body;
      const userId = req.auth.userId;

      const permission = await Permission.findByPk(id_permission);

      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }

      const oldValues = { ...permission.dataValues };

      await permission.update({ name });

      await createAudit({
        table_name: 'permission',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: permission.dataValues,
        userId,
      });

      return res.status(200).json({ message: 'Permission updated successfully', permission });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating permission', error });
    }
  },

  // Supprimer une permission
  deletePermission: async (req, res) => {
    try {
      const { id_permission } = req.params;
      const userId = req.auth.userId;

      const permission = await Permission.findByPk(id_permission);

      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }

      const oldValues = { ...permission.dataValues };

      await permission.destroy();

      await createAudit({
        table_name: 'permission',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting permission', error });
    }
  },

  // Récupérer les permissions d'un utilisateur par ID
  getPermissionsByUserId: async (req, res) => {
    try {
      const { id_user } = req.params;

      const user = await User.findByPk(id_user, {
        include: {
          model: Permission,
          through: { attributes: [] },
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user.Permissions);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching permissions for user', error });
    }
  },
};

module.exports = permissionController;
