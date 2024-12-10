const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Permission extends Model {}

Permission.init(
  {
    id_permission: {
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
    modelName: 'Permission',
    tableName: 'Permission',
  }
);

module.exports = Permission;
