const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateToken } = require('../middleware/auth')



router.post('', validateToken, userController.createUser);
router.post('/:id', validateToken, userController.createUserByManager);
router.get('/check-manager/:id_manager/:id_user', validateToken, userController.checkManager);
router.get('/:id', validateToken, userController.getUserById);
router.get('/', validateToken, userController.getAllUsers);
router.put('/:id', validateToken, userController.updateUser);
router.delete('/:id', validateToken, userController.deleteUser);
router.put('/:id/password', validateToken, userController.changePassword);


module.exports = router;
