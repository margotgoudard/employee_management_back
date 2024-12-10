const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Category extends Model {}

Category.init(
  {
    id_category: {
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
    modelName: 'Category',
  }
);

module.exports = Category;
