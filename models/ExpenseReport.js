const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 

class ExpenseReport extends Model {}

ExpenseReport.init(
  {
    id_expense_report: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_fee_category: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'fee_category', 
        key: 'id_fee_category',
      },
    },
    id_daily_timetable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'daily_timetable_sheet',
        key: 'id_daily_timetable',
      },
    },
    amount: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING,
    },
    client: {
      type: DataTypes.STRING, 
    },
    motive: {
      type: DataTypes.STRING, 
    },
  },
  {
    sequelize,
    modelName: 'ExpenseReport',
  }
);

module.exports = ExpenseReport;
