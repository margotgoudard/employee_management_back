const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 

class Document extends Model {}

Document.init(
  {
    id_doc: {
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
  }
);

module.exports = Document;
