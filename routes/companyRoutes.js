const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const upload = require('../middleware/upload'); 
const { validateToken } = require('../middleware/auth')

router.post('', validateToken, upload.single('logo'), companyController.createCompany);
router.get('', validateToken, companyController.getCompanies);
router.get('/:id_company', validateToken, companyController.getCompanyById);
router.put('/:id_company', validateToken, upload.single('logo'), companyController.updateCompany); 
router.delete('/:id_company', validateToken, companyController.deleteCompany);
router.get('/users/:id_company', validateToken, companyController.getUsersByCompanyId);

module.exports = router;
