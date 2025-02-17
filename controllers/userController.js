const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { createAudit } = require('./auditController');
const Subordination = require('../models/Subordination');

const userController = {

  createUser: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        role,
        mail,
        phone,
        password,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        is_admin,
        is_sup_admin,
        id_department
      } = req.body;
      const userId = req.auth.userId;

      if (
        !first_name || !last_name || !role || !mail || !phone || !password ||
        !num_address || !street_address || !city_address || !area_code_address ||
        !region_address || !country_address ||
        typeof is_admin !== 'boolean' || typeof is_sup_admin !== 'boolean'
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mail)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
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
        id_department
      });

      await createAudit({
        table_name: 'user',
        action: 'CREATE',
        old_values: null,
        new_values: user.dataValues,
        userId,
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
          id_department: user.id_department
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          message: 'The provided email is already in use. Please use a different email.',
        });
      }

      return res.status(500).json({ message: 'Error creating user', error });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users', error });
    }
  },

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

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        first_name, last_name, role, mail, phone, num_address,
        street_address, city_address, area_code_address, region_address, country_address,
        is_admin, is_sup_admin, id_department
      } = req.body;
      const userId = req.auth.userId;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const oldValues = { ...user.dataValues }; 

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
        id_department
      });

      await createAudit({
        table_name: 'user',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: user.dataValues,
        userId,
      });

      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user', error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.auth.userId; 

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const oldValues = { ...user.dataValues };

      await user.update({
        is_activated: false,
      });
      await createAudit({
        table_name: 'user',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: { ...user.dataValues, is_activated: false },
        userId,
      });

      return res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error) {
      console.error('Error deactivating user:', error);
      return res.status(500).json({ message: 'Error deactivating user', error });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { newPassword, confirmationPassword } = req.body; 

      const userId = req.auth.userId;

      if (!newPassword || !confirmationPassword) {
        return res
          .status(400)
          .json({ message: 'New password and confirmation password are required' });
      }

      if (newPassword !== confirmationPassword) {
        return res
          .status(400)
          .json({ message: 'New password and confirmation password do not match' });
      }
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.last_connected !== null) {
        return res
          .status(400)
          .json({
            message:
              'Password can only be changed if last_connected is null. Please contact an administrator.',
          });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const oldValues = { password: user.password, last_connected: user.last_connected };

      await user.update({
        password: hashedPassword,
        last_connected: new Date(),
      });

      await createAudit({
        table_name: 'user',
        action: 'DESACTIVATE',
        old_values: oldValues,
        new_values: { password: hashedPassword, last_connected: new Date() },
        userId,
      });

      return res.status(200).json({
        message: 'Password updated successfully and last_connected updated',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Error changing password', error });
    }
  },

  createUserByManager: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        first_name,
        last_name,
        role,
        mail,
        phone,
        password,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        is_admin,
        is_sup_admin,
        id_department,
      } = req.body;

      const userId = req.auth.userId;

      if (
        !first_name || !last_name || !role || !mail || !phone || !password ||
        !num_address || !street_address || !city_address || !area_code_address ||
        !region_address || !country_address ||
        typeof is_admin !== 'boolean' || typeof is_sup_admin !== 'boolean'
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mail)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
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
        id_department
      });

      await Subordination.create({
        id_manager: id,
        id_user: user.id_user,
      });

      await createAudit({
        table_name: 'user',
        action: 'CREATE_BY_MANAGER',
        old_values: null,
        new_values: user.dataValues,
        userId,
      });

      return res.status(201).json({
        message: 'User created successfully and linked to manager',
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
          id_department: user.id_department
        },
      });
    } catch (error) {
      console.error('Error creating user by manager:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          message: 'The provided email is already in use. Please use a different email.',
        });
      }

      return res.status(500).json({ message: 'Error creating user by manager', error });
    }
  },

  checkManager: async (req, res) => {
    try {
      const { id_manager, id_user } = req.params;
      
      const subordination = await Subordination.findOne({
        where: {
          id_manager,
          id_user,
        },
      });

      if (!subordination) {
        return res.status(200).json({ isManager: false });
      }

      return res.status(200).json({ isManager: true });
    } catch (error) {
      console.error('Error checking manager:', error);
      return res.status(500).json({ message: 'Error checking manager', error });
    }
  },

};

module.exports = userController;
