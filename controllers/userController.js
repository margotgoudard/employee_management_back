const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

const userController = {

  // Création d'un utilisateur
  createUser: async (req, res) => {
    try {
      const { first_name, last_name, role, mail, phone, password, num_address, street_address, city_address, area_code_address, region_address, country_address, is_admin, is_sup_admin } = req.body;

      if (!first_name || !last_name || !role || !mail || !phone || !password || !num_address || !street_address || !city_address || !area_code_address || !region_address || !country_address || typeof is_admin !== 'boolean' || typeof is_sup_admin !== 'boolean') {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        first_name,
        last_name,
        role,
        mail,
        phone,
        password: hashedPassword,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        is_admin,
        is_sup_admin,
        last_connected: new Date(), 
      });

      return res.status(201).json({
        message: 'User created successfully',
        user: {
          id_user: user.id_user,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          mail: user.mail,
          phone: user.phone,
          num_address: user.num_address,
          street_address: user.street_address,
          city_address: user.city_address,
          area_code_address: user.area_code_address,
          region_address: user.region_address,
          country_address: user.country_address,
          is_admin: user.is_admin,
          is_sup_admin: user.is_sup_admin,
          last_connected: user.last_connected,
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Error creating user', error });
    }
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users', error });
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return res.status(500).json({ message: 'Error fetching user by ID', error });
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, role, mail, phone, num_address, street_address, city_address, area_code_address, region_address, country_address, is_admin, is_sup_admin } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update({
        first_name,
        last_name,
        role,
        mail,
        phone,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        is_admin,
        is_sup_admin,
      });

      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user', error });
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user', error });
    }
  },

  // Modifier le mot de passe d'un utilisateur par ID
  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old password and new password are required' });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await user.update({ password: hashedPassword });

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Error changing password', error });
    }
  },

};

module.exports = userController;
