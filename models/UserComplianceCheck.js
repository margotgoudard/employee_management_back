const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class UserComplianceCheck extends Model {}

UserComplianceCheck.init(
  {
    id_user_compliance_check: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_compliance_check: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user',
      },
    },
    parameters: {
     type: DataTypes.JSONB,
     allowNull: true, 
   },
  },
  {
    sequelize,
    modelName: 'UserComplianceCheck',
    tableName: 'user_compliance_check',
  }
);

module.exports = UserComplianceCheck;
