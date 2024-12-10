const sequelize = require('../config/sequelize.js')
const { Sequelize } = require('sequelize');
const Audit = require('./Audit.js');
const User = require('./User.js');
const Company = require('./Company.js');
const Permission = require('./Permission.js');

Audit.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Audit, { foreignKey: 'id_user', as: 'audits' });

User.belongsToMany(Company, { through: 'User_Company', foreignKey: 'id_user' });
Company.belongsToMany(User, { through: 'User_Company', foreignKey: 'id_company' });

User.belongsToMany(Permission, { through: 'User_Permission', foreignKey: 'id_user' });
Permission.belongsToMany(User, { through: 'User_Permission', foreignKey: 'id_permission' });

module.exports = {User, Audit}