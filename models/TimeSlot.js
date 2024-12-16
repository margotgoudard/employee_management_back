const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 

class TimeSlot extends Model {}

TimeSlot.init(
  {
    id_time_slot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_daily_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'daily_timetable_sheet', 
        key: 'id_daily_timetable',  
      },
    },
    id_place_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'place_category', 
        key: 'id_place_category', 
      },
    },
    status: {
      type: DataTypes.ENUM(
        'Travaillé',
        'Congés payés',
        'Arrêt maladie',
        'Congés sans solde'
      ),
      allowNull: false,
    },
    start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    num_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area_code_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'TimeSlot',
    tableName: 'time_slot', 
  }
);

module.exports = TimeSlot;
