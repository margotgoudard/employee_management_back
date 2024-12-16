const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateToken } = require('../middleware/auth')


router.post('', userController.createUser);
router.get('/', userController.getAllUsers);
// test de middleware
router.get('/:id',validateToken, userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id/password', userController.changePassword);

module.exports = router;
