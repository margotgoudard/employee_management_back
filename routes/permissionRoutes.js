const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const { validateToken }= require('../middleware/auth')

router.post('', validateToken, permissionController.createPermission);
router.get('', validateToken, permissionController.getPermissions);
router.get('/:id_permission', validateToken, permissionController.getPermissionById);
router.put('/:id_permission', validateToken, permissionController.updatePermission);
router.delete('/:id_permission', validateToken, permissionController.deletePermission);

// ???
router.get('/user/:id_user', validateToken, permissionController.getPermissionsByUserId);

module.exports = router;
