const { Sequelize } = require("sequelize");
const { createTunnel } = require('tunnel-ssh');
const fs = require("fs");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

let sequelize;

async function main() {
  console.log("Mode développement : connexion à la base de données ." + process.env.NODE_ENV);

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
    }
  );

  sequelize
    .authenticate()
    .then(() => console.log("Connexion à la base de données locale réussie."))
    .catch((err) => console.error("Erreur de connexion locale :", err));
} 


main();

module.exports = sequelize;
