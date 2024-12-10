const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class PlaceCategory extends Model {}

PlaceCategory.init(
  {
    id_place_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PlaceCategory',
    tableName: 'place_category', 
    timestamps: true,
  }
);

module.exports = PlaceCategory;
