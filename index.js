// const sequelize = require('./config/config');
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

sequelizeAuthAndSync()

// Routes
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

app.use('/api/users', userRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/feeCategories', feeCategoryRoutes);
app.use('/api/placeCategories', placeCategoryRoutes);
app.use('/api/expenseReports', expenseReportRoutes);
app.use('/api/dailyTimetableSheets', dailyTimetableSheetRoutes);
app.use('/api/timeSlots', timeSlotRoutes);
app.use('/api/mensualTimetableSheets', mensualTimetableSheetRoutes);

app.use('/api/permissions', permissionRoutes);
app.use('/api/document-categories', documentCategoryRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Serveur lancé à l'adresse : http://localhost:${PORT}`);
});
