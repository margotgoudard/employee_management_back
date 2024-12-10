const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const PlaceCategory = require('./PlaceCategory');

class Place extends Model {}

Place.init(
  {
    id_place: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    num_address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    street_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    area_code_address: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    region_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_place_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PlaceCategory,
        key: 'id_place_category',
      },
    },
  },
  {
    sequelize,
    modelName: 'Place',
    tableName: 'place',
    timestamps: true, 
  }
);



module.exports = Place;
