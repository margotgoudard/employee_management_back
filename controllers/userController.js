<<<<<<< HEAD
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
=======
const User = require('../models/User'); // Importation du modèle User

const userController = {
  // Méthode pour créer un utilisateur
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
        last_connected,
      } = req.body;

      // Vérification des champs obligatoires
      if (!first_name || !mail || !password) {
        return res.status(400).json({
          success: false,
          message: "Les champs 'first_name', 'mail' et 'password' sont obligatoires.",
        });
      }

      // Validation simple de l'adresse e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mail)) {
        return res.status(400).json({
          success: false,
          message: "L'adresse e-mail fournie n'est pas valide.",
        });
      }

      // Vérification si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { mail } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Un utilisateur avec cette adresse e-mail existe déjà.",
        });
      }

      // Création du nouvel utilisateur dans la base de données
      const newUser = await User.create({
        first_name,
        last_name,
        role,
        mail,
        phone,
        password, // Assurez-vous de hacher le mot de passe si nécessaire
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        is_admin,
        is_sup_admin,
        last_connected,
      });

      // Réponse de succès
      return res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès.",
        user: {
          id_user: newUser.id_user,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          mail: newUser.mail,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la création de l'utilisateur.",
        error: error.message,
      });
    }
  },
};

>>>>>>> origin/main
module.exports = userController;
