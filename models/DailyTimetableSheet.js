const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const MensualTimetableSheet = require('./MensualTimetableSheet');

class DailyTimetableSheet extends Model {}

DailyTimetableSheet.init(
  {
    id_daily_timetable: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_timetable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MensualTimetableSheet,
        key: 'id_timetable',
      },
    },
    day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'Travaillé',
        'Week-end',
        'Férié',
        'Congés payés',
        'Arrêt maladie',
        'Congés sans solde'
      ),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    on_call_duty: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'DailyTimetableSheet',
    tableName: 'daily_timetable_sheet',
  }
);




module.exports = DailyTimetableSheet;
