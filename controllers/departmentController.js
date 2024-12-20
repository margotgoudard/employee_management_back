const Department = require('../models/Department');
const { createAudit } = require('./auditController');
const sequelize = require('../config/sequelize');

const departmentController = {
  // Créer un department
  createDepartment: async (req, res) => {
    try {
      const { name, id_sup_department, id_company } = req.body;
      const userId = req.auth.userId; // Authenticated user ID

      const department = await Department.create({ name, id_sup_department, id_company });

      // Créer un audit
      await createAudit({
        table_name: 'department',
        action: 'CREATE',
        old_values: null,
        new_values: department.dataValues,
        userId,
      });

      return res.status(201).json({ message: 'Department created successfully', department });
    } catch (error) {
      console.error('Error in createDepartment:', error);
      return res.status(500).json({ message: 'Error creating department', error });
    }
  },

  // Récupérer tous les departments
  getDepartments: async (req, res) => {
    try {
      const departments = await Department.findAll();
      return res.status(200).json(departments);
    } catch (error) {
      console.error('Error in getDepartments:', error);
      return res.status(500).json({ message: 'Error fetching departments', error });
    }
  },

  // Récupérer un department par ID
  getDepartmentById: async (req, res) => {
    try {
      const { id_department } = req.params;

      const department = await Department.findByPk(id_department);

      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      return res.status(200).json(department);
    } catch (error) {
      console.error('Error in getDepartmentById:', error);
      return res.status(500).json({ message: 'Error fetching department', error });
    }
  },

  // Mettre à jour un department
  updateDepartment: async (req, res) => {
    try {
      const { id_department } = req.params;
      const { name, id_sup_department, id_company } = req.body;
      const userId = req.auth.userId;

      const department = await Department.findByPk(id_department);

      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      const oldValues = { ...department.dataValues };

      await department.update({ name, id_sup_department, id_company });

      // Créer un audit
      await createAudit({
        table_name: 'department',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: department.dataValues,
        userId,
      });

      return res.status(200).json({ message: 'Department updated successfully', department });
    } catch (error) {
      console.error('Error in updateDepartment:', error);
      return res.status(500).json({ message: 'Error updating department', error });
    }
  },

  // Supprimer un department
  deleteDepartment: async (req, res) => {
    try {
      const { id_department } = req.params;
      const userId = req.auth.userId;

      const department = await Department.findByPk(id_department);

      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      const oldValues = { ...department.dataValues };

      await department.destroy();

      // Créer un audit
      await createAudit({
        table_name: 'department',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error('Error in deleteDepartment:', error);
      return res.status(500).json({ message: 'Error deleting department', error });
    }
  },
  // Récupérer les sous-départements d'un département
  getSubDepartments: async (req, res) => {
    try {
      const { id_department } = req.params;

      const subDepartments = await Department.findAll({
        where: { id_sup_department: id_department },
      });

      if (subDepartments.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(subDepartments);
    } catch (error) {
      console.error('Error in getSubDepartments:', error);
      return res.status(500).json({ message: 'Error fetching sub-departments', error });
    }
  },

    // Récupérer tous les départements d'une entreprise
    getDepartmentsByCompany: async (req, res) => {
    try {
      const { id_company } = req.params;
  
      const departments = await Department.findAll({
        where: { id_company },
      });
  
      if (departments.length === 0) {
        return res.status(200).json([]);
      }
  
      return res.status(200).json(departments);
    } catch (error) {
      console.error('Error in getDepartmentsByCompany:', error);
      return res.status(500).json({ message: 'Error fetching departments for company', error });
    }
  },
  
};


module.exports = departmentController;
