const express = require('express');
const router = express.Router();
const {subordinationController} = require('../controllers/subordinationController');
const { validateToken } = require('../middleware/auth'); 

router.post('/assign', validateToken, subordinationController.assignManagerToUser);
router.get('/subordinates/:id_manager', validateToken, subordinationController.getSubordinatesByManager);
router.delete('/remove/:id_user/:id_manager', validateToken, subordinationController.removeSubordination);
router.put('/update', validateToken, subordinationController.updateSubordination);
router.get('/manager-chain/:id', subordinationController.getManagerHierarchy);
router.get('/manager/user/:id', subordinationController.getManager);
router.get('/all-subordinates/:id_manager', validateToken, subordinationController.getAllSubordinatesByManager);

module.exports = router;
