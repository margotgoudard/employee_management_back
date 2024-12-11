const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

router.post('', permissionController.createPermission);
router.get('', permissionController.getPermissions);
router.get('/:id_permission', permissionController.getPermissionById);
router.put('/:id_permission', permissionController.updatePermission);
router.delete('/:id_permission', permissionController.deletePermission);
router.get('/user/:id_user', permissionController.getPermissionsByUserId);

module.exports = router;
