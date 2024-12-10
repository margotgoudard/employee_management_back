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
    num_address: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    street_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city_address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    area_code_address: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    region_address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    country_address: {
      type: DataTypes.STRING(100),
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
    tableName: 'company',
  }
);

module.exports = Company;
