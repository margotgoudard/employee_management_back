const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class UserComplianceCheck extends Model {}

UserComplianceCheck.init(
  {
    id_compliance_check: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parameters: {
     type: DataTypes.JSONB,
     allowNull: true, 
     defaultValue: {}, 
   },
  },
  {
    sequelize,
    modelName: 'UserComplianceCheck',
    tableName: 'user_compliance_check',
  }
);

module.exports = UserComplianceCheck;
