const express = require('express');
const router = express.Router();
const {notificationController} = require('../controllers/notificationController');

const { validateToken }= require('../middleware/auth')

router.post('/', validateToken, notificationController.createNotification);
router.delete('/:id_notification', validateToken, notificationController.deleteNotification);

module.exports = router;
