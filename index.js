const cron = require('node-cron');
const sequelize = require('./config/sequelize.js');
const { sequelizeAuthAndSync } = require('./controllers/connectionDB');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); 
app.use(express.json());

sequelizeAuthAndSync();  

// Tâche cron pour créer les emplois du temps mensuels chaque premier jour du mois à minuit
cron.schedule('0 0 1 * *', async () => {
    console.log('Starting monthly timetable creation (test)...');
    try {
        await sequelize.query('SELECT create_timetables_for_all_users()');
        console.log('Monthly timetables created successfully.');
    } catch (error) {
        console.error('Error creating monthly timetables:', error);
    }
});


const userRoutes = require('./routes/userRoutes');
const auditRoutes = require('./routes/auditRoutes');
const companyRoutes = require('./routes/companyRoutes');
const feeCategoryRoutes = require('./routes/feeCategoryRoutes')
const placeCategoryRoutes = require('./routes/placeCategoryRoutes')
const expenseReportRoutes = require('./routes/expenseReportRoutes.js')
const dailyTimetableSheetRoutes = require('./routes/dailyTimetableRoutes.js')
const timeSlotRoutes = require('./routes/timeSlotRoutes.js')
const mensualTimetableSheetRoutes = require('./routes/mensualTimetableRoutes.js')
const permissionRoutes = require('./routes/permissionRoutes');
const documentCategoryRoutes = require('./routes/documentCategoryRoutes');
const documentRoutes = require('./routes/documentRoutes');
const authRoutes = require('./routes/authRoutes.js')
const departmentRoutes = require('./routes/departmentRoutes.js')
const subordinationRoutes = require('./routes/subordinationRoutes.js')


const complianceCheckRoutes = require('./routes/complianceCheckRoutes');

app.use('/api/users', userRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/fee-categories', feeCategoryRoutes);
app.use('/api/place-categories', placeCategoryRoutes);
app.use('/api/expense-reports', expenseReportRoutes);
app.use('/api/daily-timetable-sheets', dailyTimetableSheetRoutes);
app.use('/api/time-slots', timeSlotRoutes);
app.use('/api/mensual-timetable-sheets', mensualTimetableSheetRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/document-categories', documentCategoryRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/compliance-checks', complianceCheckRoutes);
app.use('/api/subordinations', subordinationRoutes)

const complianceCheckController = require('./controllers/complianceCheckController');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Serveur lancé à l'adresse : http://localhost:${PORT}`);
});

