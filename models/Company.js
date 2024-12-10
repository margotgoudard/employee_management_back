const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Company extends Model {}

Company.init(
  {
    id_company: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    logo: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Company',
  }
);

module.exports = Company;
