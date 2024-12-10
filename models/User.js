const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 

class User extends Model {}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    mail: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    num_address: {
      type: DataTypes.STRING,
    },
    street_address: {
      type: DataTypes.STRING,
    },
    city_address: {
      type: DataTypes.STRING,
    },
    area_code_address: {
      type: DataTypes.STRING,
    },
    region_address: {
      type: DataTypes.STRING,
    },
    country_address: {
      type: DataTypes.STRING,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
    },
    is_sup_admin: {
      type: DataTypes.BOOLEAN,
    },
    last_connected: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,  
    modelName: 'User',
    tableName: 'User',
  }
);

module.exports = User; 
