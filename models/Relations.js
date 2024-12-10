const sequelize = require('../config/sequelize.js')
const { Sequelize } = require('sequelize');
const Audit = require('./Audit.js');
const User = require('./User.js');
const Company = require('./Company.js');
const Permission = require('./Permission.js');
const Category = require('./Category.js');
const Document = require('./Document.js');

Audit.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Audit, { foreignKey: 'id_user', as: 'audits' });

User.belongsToMany(Company, { through: 'User_Company', foreignKey: 'id_user' });
Company.belongsToMany(User, { through: 'User_Company', foreignKey: 'id_company' });

User.belongsToMany(Permission, { through: 'User_Permission', foreignKey: 'id_user' });
Permission.belongsToMany(User, { through: 'User_Permission', foreignKey: 'id_permission' });

Document.belongsTo(Category, { foreignKey: 'id_category', as: 'category' });
Category.hasMany(Document, { foreignKey: 'id_category', as: 'documents' });

Document.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Document, { foreignKey: 'id_user', as: 'documents' });

module.exports = {User, Audit}