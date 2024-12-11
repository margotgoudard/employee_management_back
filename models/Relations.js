const sequelize = require('../config/sequelize.js')
const { Sequelize } = require('sequelize');
const Audit = require('./Audit.js');
const User = require('./User.js');
const Company = require('./Company.js');
const Permission = require('./Permission.js');
const DocumentCategory = require('./DocumentCategory.js');
const Document = require('./Document.js');
const ComplianceCheck = require('./ComplianceCheck.js');
const UserComplianceCheck = require('./UserComplianceCheck.js');
const ComplianceCheckParameter = require('./ComplianceCheckParameter.js');
const Department = require('./Department.js');
const Notification = require('./Notification.js');
const Subordination = require('./Subordination.js');

Audit.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Audit, { foreignKey: 'id_user', as: 'audits' });

User.belongsToMany(Company, { through: 'user_company', foreignKey: 'id_user' });
Company.belongsToMany(User, { through: 'user_company', foreignKey: 'id_company' });

User.belongsToMany(Permission, { through: 'user_permission', foreignKey: 'id_user' });
Permission.belongsToMany(User, { through: 'user_permission', foreignKey: 'id_permission' });

Document.belongsTo(DocumentCategory, { foreignKey: 'id_document_category', as: 'document_category' });
DocumentCategory.hasMany(Document, { foreignKey: 'id_document_category', as: 'documents' });

Document.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Document, { foreignKey: 'id_user', as: 'documents' });

ComplianceCheckParameter.belongsTo(ComplianceCheck, { foreignKey: 'id_compliance_check', as: 'compliance_check' });
ComplianceCheck.hasMany(ComplianceCheckParameter, { foreignKey: 'id_compliance_check', as: 'parameters' });

UserComplianceCheck.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(UserComplianceCheck, { foreignKey: 'id_user', as: 'compliance_checks' });

UserComplianceCheck.belongsTo(ComplianceCheck, { foreignKey: 'id_compliance_check', as: 'compliance_check' });
ComplianceCheck.hasMany(UserComplianceCheck, { foreignKey: 'id_compliance_check', as: 'users' });

Department.belongsTo(Company, { foreignKey: 'id_company', as: 'company' });
Company.hasMany(Department, { foreignKey: 'id_company', as: 'departments' });

Notification.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Notification, { foreignKey: 'id_user', as: 'notifications' });

Subordination.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Subordination, { foreignKey: 'id_user', as: 'subordinations' });

Subordination.belongsTo(User, { foreignKey: 'id_manager', as: 'manager' });
User.hasMany(Subordination, { foreignKey: 'id_manager', as: 'managed' });

Subordination.belongsTo(Department, { foreignKey: 'id_department', as: 'department' });
Department.hasMany(Subordination, { foreignKey: 'id_department', as: 'subordinations' });

module.exports = {User, Audit, Company, Permission, DocumentCategory, Document, UserComplianceCheck, ComplianceCheck, ComplianceCheckParameter, Department, Notification, Subordination};