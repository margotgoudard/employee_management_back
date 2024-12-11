const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Notification extends Model {}

Notification.init(
  {
    id_notification: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    viewed: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false,
    },
    id_user: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user',
      },
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notification',
  }
);

module.exports = Notification;
