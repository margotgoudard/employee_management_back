const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class ComplianceCheck extends Model {}

ComplianceCheck.init(
  {
    id_compliance_check: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
    },
    function_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ComplianceCheck',
    tableName: 'compliance_check',
  }
);

module.exports = ComplianceCheck;
