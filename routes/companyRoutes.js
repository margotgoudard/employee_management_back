const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const upload = require('../middleware/upload'); 

router.post('', upload.single('logo'), companyController.createCompany);
router.get('', companyController.getCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', upload.single('logo'), companyController.updateCompany); 
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
