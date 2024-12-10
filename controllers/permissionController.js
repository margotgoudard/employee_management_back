const Permission = require('../models/Permission');
const User = require('../models/User');

const permissionController = {

    createPermission: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const permission = await Permission.create({ name });
      return res.status(201).json({ message: 'Permission created successfully', permission });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating permission', error });
    }
  },

  getPermissions: async (req, res) => {
    try {
      const permissions = await Permission.findAll();
      return res.status(200).json(permissions);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching permissions', error });
    }
  },

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

  updatePermission: async (req, res) => {
    try {
      const { id_permission } = req.params;
      const { name } = req.body;

      const permission = await Permission.findByPk(id_permission);

      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }

      await permission.update({ name });
      return res.status(200).json({ message: 'Permission updated successfully', permission });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating permission', error });
    }
  },

  deletePermission: async (req, res) => {
    try {
      const { id_permission } = req.params;

      const permission = await Permission.findByPk(id_permission);

      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }

      await permission.destroy();
      return res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting permission', error });
    }
  },

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
