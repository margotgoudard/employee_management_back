const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

class MensualTimetableSheet extends Model {}

MensualTimetableSheet.init(
  {
    id_timetable: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id_user',
      },
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    commission: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'À compléter',
        'En attente d\'approbation',
        'Acceptée'
      ),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'MensualTimetableSheet',
    tableName: 'mensual_timetable_sheet'
  }
);

module.exports = MensualTimetableSheet;
