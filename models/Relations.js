const sequelize = require('../config/sequelize.js')
const { Sequelize } = require('sequelize');
const Audit = require('./Audit.js');
const User = require('./User.js');
const Company = require('./Company.js');
const FeeCategory = require('./FeeCategory.js');
const PlaceCategory = require('./PlaceCategory.js');
const Place = require('./Place.js');
const ExpenseReport = require('./ExpenseReport.js');
const DailyTimetableSheet = require('./DailyTimetableSheet.js');
const TimeSlot = require('./TimeSlot.js');
const MensualTimetableSheet = require('./MensualTimetableSheet.js');


Audit.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
User.hasMany(Audit, { foreignKey: 'id_user', as: 'audits' });

User.belongsToMany(Company, { through: 'User_Company', foreignKey: 'id_user' });
Company.belongsToMany(User, { through: 'User_Company', foreignKey: 'id_company' });

// Relations Place et PlaceCategory
Place.belongsTo(PlaceCategory, { foreignKey: 'id_place_category', as: 'category'});
PlaceCategory.hasMany(Place, { foreignKey: 'id_place_category', as: 'places'});

// Relations TimeSlot et DailyTimeTableSheet
TimeSlot.belongsTo(DailyTimetableSheet, { foreignKey: 'id_daily_time', as: 'dailyTime' });
DailyTimetableSheet.hasMany(TimeSlot, { foreignKey: 'id_daily_time', as: 'timeSlots' });

// Relations TimeSlot et PlaceCategory
TimeSlot.belongsTo(PlaceCategory, { foreignKey: 'id_place_category', as: 'placeCategory' });
PlaceCategory.hasMany(TimeSlot, { foreignKey: 'id_place_category', as: 'timeSlots' });


// Relations DailyTimetableSheet et ExpenseReport
DailyTimetableSheet.hasMany(ExpenseReport, { foreignKey: 'id_daily_timetable', as: 'expenseReports' });
ExpenseReport.belongsTo(DailyTimetableSheet, { foreignKey: 'id_daily_timetable', as: 'dailyTimetable' });

// Relations entre MensualTimetableSheet et DailyTimetableSheet
MensualTimetableSheet.hasMany(DailyTimetableSheet, { foreignKey: 'id_timetable', as: 'dailyTimetableList' });
DailyTimetableSheet.belongsTo(MensualTimetableSheet, { foreignKey: 'id_timetable', as: 'mensualTimetable' });

// Relations MensualTimetableSheet et User
MensualTimetableSheet.belongsTo(User, { foreignKey: 'id_user', as: 'user' });  
MensualTimetableSheet.hasMany(DailyTimetableSheet, { foreignKey: 'id_timetable', as: 'dailyTimetables' });  

// Realtions FeeCategory et ExpenseReport
FeeCategory.hasMany(ExpenseReport, { foreignKey: 'id_fee_category', as: 'expenseReports' });
ExpenseReport.belongsTo(FeeCategory, { foreignKey: 'id_fee_category', as: 'feeCategory' });



module.exports = {User, Audit, FeeCategory, Place, PlaceCategory, ExpenseReport, DailyTimetableSheet, MensualTimetableSheet, TimeSlot}