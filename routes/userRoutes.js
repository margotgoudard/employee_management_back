const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/userController');

    
router.post('/', createUser); // Route pour créer un utilisateur


module.exports = router;
