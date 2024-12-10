const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const upload = require('../middleware/upload'); 

router.post('', upload.single('logo'), companyController.createCompany);
router.get('', companyController.getCompanies);
router.get('/:id_company', companyController.getCompanyById);
router.put('/:id_company', upload.single('logo'), companyController.updateCompany); 
router.delete('/:id_company', companyController.deleteCompany);

module.exports = router;
