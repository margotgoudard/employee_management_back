const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class CheckParameter extends Model {}

CheckParameter.init(
  {
    id_parameter: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_compliance_check: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CheckParameter',
    tableName: 'check_parameter',
  }
);

module.exports = CheckParameter;
