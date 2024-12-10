const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Department extends Model {}

Department.init(
  {
    id_department: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_sup_department: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      references: {
        model: 'Department',
        key: 'id_department',
      },
    },
    id_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'id_company',
      },
    },
  },
  {
    sequelize,
    modelName: 'Department',
    tableName: 'department',
  }
);

module.exports = Department;
