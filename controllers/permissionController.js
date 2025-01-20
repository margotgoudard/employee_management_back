const { User, Permission } = require('../models/Relations');
const { createAudit } = require('./auditController');

const permissionController = {

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

  getPermissionsByUserId: async (req, res) => {
    try {
      const { id_user } = req.params;
  
      if (!id_user) {
        return res.status(400).json({ error: "L'ID utilisateur est requis" });
      }
  
      const user = await User.findByPk(id_user, {
        include: {
          model: Permission,
          through: { attributes: [] }, 
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: "Utilisateur introuvable" });
      }
  
      return res.status(200).json(user.Permissions); 
    } catch (error) {
      console.error('Erreur interne:', error);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  },
  

  addPermissionToUser: async (req, res) => {
    try {
      const { id_user, id_permission } = req.body;

      const userId = req.auth.userId;
  
      const user = await User.findByPk(id_user);
      const permission = await Permission.findByPk(id_permission);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
  
      await user.addPermission(permission);
  
      await createAudit({
        table_name: 'user_permission',
        action: 'ASSOCIATE',
        old_values: null,
        new_values: { id_user, id_permission },
        userId,
      });
  
      return res.status(200).json({ message: 'Permission added to user successfully' });
    } catch (error) {
      console.error('Error details:', error.message, error.stack);
      return res.status(500).json({ message: 'Error adding permission to user', error });
    }
  },
  
  removePermissionFromUser: async (req, res) => {
    try {
      const { id_user, id_permission } = req.params; 
      const userId = req.auth.userId; 
  
      const user = await User.findByPk(id_user, {
        include: Permission, 
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const permission = await Permission.findByPk(id_permission);
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
  
      const userHasPermission = await user.hasPermission(permission);
      if (!userHasPermission) {
        return res.status(404).json({ message: 'Permission not associated with user' });
      }
  
      await user.removePermission(permission);
  
      await createAudit({
        table_name: 'user_permission',
        action: 'DISASSOCIATE',
        old_values: { id_user, id_permission },
        new_values: null,
        userId,
      });
  
      return res.status(200).json({ message: 'Permission removed from user successfully' });
    } catch (error) {
      console.error('Error in removePermissionFromUser:', error);
      return res.status(500).json({ message: 'Error removing permission from user', error });
    }
  }
  
  

};

module.exports = permissionController;
