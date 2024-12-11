// config/sequelize.js
const { Sequelize } = require('sequelize');

// Récupérer les informations de connexion à partir des variables d'environnement ou des valeurs par défaut
const username = process.env.DB_USERNAME || "user";
const password = process.env.DB_PASSWORD || "user";
const host = process.env.DB_HOST || "127.0.0.1";
const database = process.env.DB_NAME || "pss_employee";
const port = process.env.DB_PORT || 5432;

// Créer une nouvelle instance Sequelize
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port,
  logging: false,
});

module.exports =  sequelize ;