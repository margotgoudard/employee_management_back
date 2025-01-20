const Notification = require('../models/Notification');
const User = require('../models/User');
const { getManagerForUser } = require('../controllers/subordinationController')
const createAudit = require('./auditController').createAudit;

const createNotification = async ({ content, type, id_user, id_timetable, userId }) => {
    try {
      const user = await User.findByPk(id_user);
      if (!user) {
        throw new Error('User not found');
      }

      const newNotification = await Notification.create({
        content,
        type,
        id_user,
        id_timetable,
      });
  
      await createAudit({
        table_name: 'notification',
        action: 'CREATE',
        old_values: null,
        new_values: newNotification.dataValues,
        userId,
      });
  
      return newNotification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  };

  const handleMensualTimetableNotification = async ({ status, id_user, timetable, userId }) => {
    try {
      let notificationContent;
      let targetUserIds;
      let typeOfNotification = 'information';
    
      switch (status) {
        case 'En attente d\'approbation':
          notificationContent = `Une nouvelle fiche mensuelle ${timetable.month} ${timetable.year} est en attente de votre approbation.`;
          targetUserIds = await getManagerForUser(id_user)
          if (!targetUserIds || targetUserIds.length === 0) {
            throw new Error('Aucun manager trouvé pour cet utilisateur');
          }
          break;
  
        case 'Acceptée':

          notificationContent = `Votre fiche mensuelle ${timetable.month} ${timetable.year} a été acceptée.`;
          typeOfNotification = 'success';
          targetUserIds = [id_user];
          break;

        case 'À compléter':
            notificationContent = `Votre fiche mensuelle ${timetable.month} ${timetable.year} n'est pas complète.`;
            typeOfNotification = 'warning';
            targetUserIds = [id_user];
            break;
  
        default:
          return null;
      }
  
      for (const targetUserId of targetUserIds) {

        await createNotification({
          content: notificationContent,
          type: typeOfNotification,
          id_user: targetUserId,
          id_timetable: timetable.id_timetable,
          userId,
        });
      }
    } catch (error) {
      console.error('Error handling mensual timetable notification:', error);
      throw error;
    }
  };
  

const notificationController = {

    createNotification: async (req, res) => {
        try {
          const { content, type, id_user, id_timetable } = req.body;
          const userId = req.auth.userId;
    
          const notification = await createNotification({
            content,
            type,
            id_user,
            id_timetable,
            userId,
          });
    
          return res.status(201).json(notification);
        } catch (error) {
          return res.status(500).json({ message: 'Error creating notification', error });
        }
    },
    

    deleteNotification: async (req, res) => {
        try {
        const { id_notification } = req.params;
        const userId = req.auth.userId; 

        const notification = await Notification.findByPk(id_notification);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        const oldValues = { ...notification.dataValues };
        await notification.destroy();

        await createAudit({
            table_name: 'notification',
            action: 'DELETE',
            old_values: oldValues,
            new_values: null,
            userId,
        });

        return res.status(200).json({ message: 'Notification deleted successfully' });
        } catch (error) {
        console.error('Error deleting notification:', error);
        return res.status(500).json({ message: 'Error deleting notification', error });
        }
    },

    getUserNotifications: async (req, res) => {
      try {
        const userId = req.auth.userId;
    
        const notifications = await Notification.findAll({
          where: { id_user: userId },
          order: [['createdAt', 'DESC']], 
        });
    
        return res.status(200).json(notifications);
      } catch (error) {
        console.error('Error fetching user notifications:', error);
        return res.status(500).json({ message: 'Error fetching user notifications', error });
      }
    },

    getNotificationById: async (req, res) => {
      try {
        const { id_notification } = req.params;
        const userId = req.auth.userId;
    
        const notification = await Notification.findOne({
          where: {
            id_notification,
            id_user: userId, 
          },
        });
    
        if (!notification) {
          return res.status(404).json({ message: 'Notification not found' });
        }
    
        return res.status(200).json(notification);
      } catch (error) {
        console.error('Error fetching notification by ID:', error);
        return res.status(500).json({ message: 'Error fetching notification by ID', error });
      }
    },
    
    getUnreadNotificationCount: async (req, res) => {
      try {
        const userId = req.auth.userId;
    
        const unreadCount = await Notification.count({
          where: { id_user: userId, viewed: false },
        });
    
        return res.status(200).json({ unreadCount });
      } catch (error) {
        console.error('Error counting unread notifications:', error);
        return res.status(500).json({ message: 'Error counting unread notifications', error });
      }
    },

    markAllAsViewed: async (req, res) => {
      try {
        const userId = req.auth.userId; 
  
        await Notification.update(
          { viewed: true }, 
          { where: { id_user: userId, viewed: false } } 
        );
  
        return res.status(200).json({ message: 'Toutes les notifications ont été marquées comme vues.' });
      } catch (error) {
        console.error('Erreur dans markAllAsViewed:', error);
        return res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
      }
    },
    
    
};

module.exports = { notificationController, createNotification, handleMensualTimetableNotification  };
