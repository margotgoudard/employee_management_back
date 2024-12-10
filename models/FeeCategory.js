const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 

class FeeCategory extends Model {}

FeeCategory.init(
  {
    id_fee_category: {
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
    modelName: 'FeeCategory',
    tableName: 'fee_category',
    timestamps: true, 
  }
);

module.exports = FeeCategory;
