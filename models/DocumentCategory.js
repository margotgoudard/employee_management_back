const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class DocumentCategory extends Model {}

DocumentCategory.init(
  {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DocumentCategory',
    tableName: 'document_category',
  }
);

module.exports = DocumentCategory;
