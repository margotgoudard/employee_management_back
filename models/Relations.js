const sequelize = require('../config/sequelize.js')
const { Sequelize } = require('sequelize');
const Audit = require('./Audit.js');
const User = require('./User.js');

Audit.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Audit, { foreignKey: 'id_user', as: 'audits' });

module.exports = {User, Audit}