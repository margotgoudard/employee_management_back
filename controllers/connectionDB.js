const sequelize = require('../config/sequelize'); 
const Relations = require('../models/Relations'); 

const sequelizeAuthAndSync = async () => {
  // try {
  //   await sequelize.authenticate(); 
  //   console.log("Database connection established");

  //   await sequelize.sync({ force: false }); 
  //   console.log("All models were synchronized successfully.");
  // } catch (err) {
  //   console.error("Error: " + err);
  // }
};

module.exports = { sequelizeAuthAndSync };
