const express = require('express');
const router = express.Router();

// Import des contrôleurs ou logique métier
const { getUsers, createUser } = require('../controllers/userController');

// Définir les routes
router.get('/', getUsers);    // Route pour récupérer les utilisateurs
router.post('/', createUser); // Route pour créer un utilisateur

// Exporte le routeur
module.exports = router;
