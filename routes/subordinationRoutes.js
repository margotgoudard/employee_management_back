const express = require('express');
const router = express.Router();
const subordinationController = require('../controllers/subordinationController');
const { validateToken } = require('../middleware/auth'); 

// Route pour assigner un manager à un utilisateur dans un département
router.post('/assign', validateToken, subordinationController.assignManagerToUser);

// Route pour obtenir les subordonnés d'un manager dans un département
router.get('/subordinates/:id_manager/:id_department', validateToken, subordinationController.getSubordinatesByManagerAndDepartment);

// Route pour obtenir les départements d'un utilisateur
router.get('/departments/:id_user', validateToken, subordinationController.getDepartmentsForUser);

// Route pour supprimer une subordination
router.delete('/remove/:id_user/:id_manager/:id_department', validateToken, subordinationController.removeSubordination);

// Route pour mettre à jour une subordination (changer le manager d'un utilisateur dans un département)
router.put('/update', validateToken, subordinationController.updateSubordination);
// Route pour récupérer la chaîne de managers
router.get('/manager-chain/:id', subordinationController.getManagerHierarchy);

router.get('/manager/user/:id', subordinationController.getManager);

module.exports = router;
