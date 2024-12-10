const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const DailyTimetableSheet = require('./DailyTimetableSheet');
const PlaceCategory = require('./PlaceCategory');

class TimeSlot extends Model {}

TimeSlot.init(
  {
    id_time_slot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_daily_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: DailyTimetableSheet, 
          key: 'id_daily_timetable',
        },
      },
    id_place_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PlaceCategory,
        key: 'id_place_category',
      },
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TimeSlot',
    tableName: 'time_slot',
  }
);



module.exports = TimeSlot;
