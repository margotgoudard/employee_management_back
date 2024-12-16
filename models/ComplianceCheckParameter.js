const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class ComplianceCheckParameter extends Model {}

ComplianceCheckParameter.init(
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
      references: {
        model: 'compliance_check',
        key: 'id_compliance_check',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    default_value: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('string', 'number', 'boolean'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ComplianceCheckParameter',
    tableName: 'compliance_check_parameter',
  }
);

module.exports = ComplianceCheckParameter;
