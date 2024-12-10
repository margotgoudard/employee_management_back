const User = require('../models/User');

const userController = {

  // Créer un nouvel utilisateur
  createUser: async (req, res) => {
    try {
      const {
        first_name, last_name, role, mail, phone, password,
        num_address, street_address, city_address, area_code_address, 
        region_address, country_address, is_admin, is_sup_admin, last_connected
      } = req.body;

      
      const newUser = await User.create({
        first_name, last_name, role, mail, phone, password,
        num_address, street_address, city_address, area_code_address, 
        region_address, country_address, is_admin, is_sup_admin, last_connected
      });

      
      return res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user', error });
    }
  }
};
module.exports = userController;
