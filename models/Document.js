const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 

class Document extends Model {}

Document.init(
  {
    id_document: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    document: {
      type: DataTypes.BLOB('long'), 
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
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
  },
  {
    sequelize,
    modelName: 'Document',
    tableName: 'document',
  }
);

module.exports = Document;
