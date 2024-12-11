const sequelize = require('../config/sequelize');
const FeeCategory = require('../models/FeeCategory'); 
const PlaceCategory = require('../models/PlaceCategory')

const sequelizeAuthAndSync = async () => {
  try {
    
    await sequelize.authenticate();
    console.log("Database connection established");

    await sequelize.sync({ force: false }); 
    console.log("All models were synchronized successfully.");

    await insertFeeCategories(); 
    await insertPlaceCategories();

  } catch (err) {
    console.error("Error: " + err);
  }
};

const insertFeeCategories = async () => {
  try {
    const feeCategoriesExist = await FeeCategory.count();

    if (feeCategoriesExist === 0) {
      await FeeCategory.bulkCreate([
        { name: 'Parking' },
        { name: 'Transports en commun' },
        { name: 'Repas' },
        { name: 'Frais kilométriques' },
        { name: 'Essence' },
        { name: 'Divers' }
      ]);
      console.log('Fee categories inserted successfully!');
    } else {
      console.log('Fee categories already exist in the database.');
    }
  } catch (error) {
    console.error('Error inserting fee categories:', error);
  }
};


const insertPlaceCategories = async () => {
  try {
    const placeCategoriesExist = await PlaceCategory.count();

    if (placeCategoriesExist === 0) {
      
      await PlaceCategory.bulkCreate([
        { name: 'Bureau' },
        { name: 'Home Office' },
        { name: 'Déplacement professionnel' }
      ]);
      console.log('Place categories inserted successfully!');
    } else {
      console.log('Place categories already exist in the database.');
    }
  } catch (error) {
    console.error('Error inserting place categories:', error);
  }
};

module.exports = { sequelizeAuthAndSync };
