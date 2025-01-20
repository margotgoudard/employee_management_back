const sequelize = require('../config/sequelize.js');
const { Sequelize } = require('sequelize');
const Audit = require('./Audit.js');
const User = require('./User.js');
const Company = require('./Company.js');
const FeeCategory = require('./FeeCategory.js');
const PlaceCategory = require('./PlaceCategory.js');
const ExpenseReport = require('./ExpenseReport.js');
const DailyTimetableSheet = require('./DailyTimetableSheet.js');
const TimeSlot = require('./TimeSlot.js');
const MensualTimetableSheet = require('./MensualTimetableSheet.js');
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
User.hasMany(Audit, { foreignKey: 'id_user', as: 'audits', onDelete: 'CASCADE' });

// Relations TimeSlot et DailyTimetableSheet
TimeSlot.belongsTo(DailyTimetableSheet, { foreignKey: 'id_daily_timetable', as: 'dailyTime', onDelete: 'CASCADE' });
DailyTimetableSheet.hasMany(TimeSlot, { foreignKey: 'id_daily_timetable', as: 'timeSlots', onDelete: 'CASCADE' });

// Relations TimeSlot et PlaceCategory
TimeSlot.belongsTo(PlaceCategory, { foreignKey: 'id_place_category', as: 'placeCategory', onDelete: 'CASCADE' });
PlaceCategory.hasMany(TimeSlot, { foreignKey: 'id_place_category', as: 'timeSlots', onDelete: 'CASCADE' });

// Relations DailyTimetableSheet et ExpenseReport
DailyTimetableSheet.hasMany(ExpenseReport, { foreignKey: 'id_daily_timetable', as: 'expenseReports', onDelete: 'CASCADE' });
ExpenseReport.belongsTo(DailyTimetableSheet, { foreignKey: 'id_daily_timetable', as: 'dailyTimetable' });

// Relations entre MensualTimetableSheet et DailyTimetableSheet
MensualTimetableSheet.hasMany(DailyTimetableSheet, { foreignKey: 'id_timetable', as: 'dailyTimetables', onDelete: 'CASCADE' });
DailyTimetableSheet.belongsTo(MensualTimetableSheet, { foreignKey: 'id_timetable', as: 'mensualTimetable', onDelete: 'CASCADE' });

// Relations MensualTimetableSheet et User
MensualTimetableSheet.belongsTo(User, { foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE' });  
User.hasMany(MensualTimetableSheet, { foreignKey: 'id_user', as: 'mensualTimetables', onDelete: 'CASCADE' });  

// Relations FeeCategory et ExpenseReport
FeeCategory.hasMany(ExpenseReport, { foreignKey: 'id_fee_category', as: 'expenseReports', onDelete: 'CASCADE' });
ExpenseReport.belongsTo(FeeCategory, { foreignKey: 'id_fee_category', as: 'feeCategory', onDelete: 'CASCADE' });

// Relations Permission et User
User.belongsToMany(Permission, { through: 'user_permission', foreignKey: 'id_user', onDelete: 'CASCADE' });
Permission.belongsToMany(User, { through: 'user_permission', foreignKey: 'id_permission', onDelete: 'CASCADE' });

// Relations Document et DocumentCategory
Document.belongsTo(DocumentCategory, { foreignKey: 'id_document_category', as: 'documentCategory', onDelete: 'CASCADE' });
DocumentCategory.hasMany(Document, { foreignKey: 'id_document_category', as: 'documents', onDelete: 'CASCADE' });

// Relations Document et User
Document.belongsTo(User, { foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE' });
User.hasMany(Document, { foreignKey: 'id_user', as: 'documents', onDelete: 'CASCADE' });

// Relations ComplianceCheckParameter et ComplianceCheck
ComplianceCheckParameter.belongsTo(ComplianceCheck, { foreignKey: 'id_compliance_check', as: 'complianceCheck', onDelete: 'CASCADE' });
ComplianceCheck.hasMany(ComplianceCheckParameter, { foreignKey: 'id_compliance_check', as: 'parameters', onDelete: 'CASCADE' });

// Relations UserComplianceCheck et User
UserComplianceCheck.belongsTo(User, { foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE' });
User.hasMany(UserComplianceCheck, { foreignKey: 'id_user', as: 'compliance_checks', onDelete: 'CASCADE' });

// Relations UserComplianceCheck et ComplianceCheck
UserComplianceCheck.belongsTo(ComplianceCheck, { foreignKey: 'id_compliance_check', as: 'complianceCheck', onDelete: 'CASCADE' });
ComplianceCheck.hasMany(UserComplianceCheck, { foreignKey: 'id_compliance_check', as: 'users', onDelete: 'CASCADE' });

// Relations Department et Company
Department.belongsTo(Company, { foreignKey: 'id_company', as: 'company', onDelete: 'CASCADE' });
Company.hasMany(Department, { foreignKey: 'id_company', as: 'departments', onDelete: 'CASCADE' });

// Relations Department et User
User.belongsTo(Department, { foreignKey: 'id_department', as: 'department', onDelete: 'CASCADE' });
Department.hasMany(User, { foreignKey: 'id_department', as: 'users', onDelete: 'CASCADE' });

// Relations Notification et User
Notification.belongsTo(User, { foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE' });
User.hasMany(Notification, { foreignKey: 'id_user', as: 'notifications', onDelete: 'CASCADE' });

// Relations Subordination et User
Subordination.belongsTo(User, { foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE' });
User.hasMany(Subordination, { foreignKey: 'id_user', as: 'subordinates', onDelete: 'CASCADE' });

// Relations Subordination et Manager (User)
Subordination.belongsTo(User, { foreignKey: 'id_manager', as: 'manager', onDelete: 'CASCADE' });
User.hasMany(Subordination, { foreignKey: 'id_manager', as: 'manages', onDelete: 'CASCADE' });


// Relations Notification et MensualTimetableSheet
Notification.belongsTo(MensualTimetableSheet, { foreignKey: 'id_timetable', as: 'mensualTimetable', onDelete: 'SET NULL' });
MensualTimetableSheet.hasMany(Notification, { foreignKey: 'id_timetable', as: 'notifications', onDelete: 'SET NULL' });


module.exports = {
    User,
    Audit,
    Company,
    FeeCategory,
    PlaceCategory,
    ExpenseReport,
    DailyTimetableSheet,
    MensualTimetableSheet,
    TimeSlot,
    Permission,
    DocumentCategory,
    Document,
    ComplianceCheck,
    UserComplianceCheck,
    ComplianceCheckParameter,
    Department,
    Notification,
    Subordination,
};
