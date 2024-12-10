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
    }
  },
  {
    sequelize,
    modelName: 'Document',
    tableName: 'Document',
  }
);

module.exports = Document;
