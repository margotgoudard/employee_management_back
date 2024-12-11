const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Audit extends Model {}

Audit.init(
  {
    id_audit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    table_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    old_values: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    new_values: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user',
      },
    },
  },
  {
    sequelize,
    modelName: 'Audit',
    tableName: 'audit',
  }
);

module.exports = Audit;
