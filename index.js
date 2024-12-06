const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); 
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Serveur lancé à l'adresse : http://localhost:${PORT}`);
});
