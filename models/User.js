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
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_code_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_sup_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    last_connected: {
      type: DataTypes.DATE,
    },
    is_activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,  
    modelName: 'User',
    tableName: 'user',
  }
);

module.exports = User; 
