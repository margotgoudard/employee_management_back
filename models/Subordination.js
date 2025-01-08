const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Subordination extends Model {}

Subordination.init(
  {
    id_subordination: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },


    id_manager: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'user',
        key: 'id_user',
      },
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
    modelName: 'Subordination',
    tableName: 'subordination',
  }
);

module.exports = Subordination;
