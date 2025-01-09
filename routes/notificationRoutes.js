const express = require('express');
const router = express.Router();
const {notificationController} = require('../controllers/notificationController');

const { validateToken }= require('../middleware/auth')

router.post('/', validateToken, notificationController.createNotification);
router.get('/', validateToken, notificationController.getUserNotifications); 
router.get('/unread-count', validateToken, notificationController.getUnreadNotificationCount);
router.patch('/mark-all-as-viewed', validateToken, notificationController.markAllAsViewed);
router.delete('/:id_notification', validateToken, notificationController.deleteNotification);
router.get('/:id_notification', validateToken, notificationController.getNotificationById); 

module.exports = router;
