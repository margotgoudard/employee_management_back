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
const permissionRoutes = require('./routes/permissionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/permissions', permissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Serveur lancé à l'adresse : http://localhost:${PORT}`);
});
