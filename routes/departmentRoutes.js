const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { validateToken } = require('../middleware/auth');


router.post('', validateToken, departmentController.createDepartment);
router.get('', validateToken, departmentController.getDepartments);
router.get('/:id_department', validateToken, departmentController.getDepartmentById);
router.put('/:id_department', validateToken, departmentController.updateDepartment);
router.delete('/:id_department', validateToken, departmentController.deleteDepartment);

router.get('/:id_department/sub-departments', validateToken, departmentController.getSubDepartments);
router.get('/company/:id_company', validateToken, departmentController.getDepartmentsByCompany);



module.exports = router;
