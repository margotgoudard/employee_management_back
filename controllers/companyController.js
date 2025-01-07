const Company = require('../models/Company');
const User = require('../models/User');
const { createAudit } = require('../controllers/auditController'); 

const companyController = {
  createCompany: async (req, res) => {
    try {
      const {
        name,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
      } = req.body;

      let logo = null;
      if (req.file) {
        logo = req.file.buffer;
      }

      const company = await Company.create({
        name,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        logo,
      });

      await createAudit({
        table_name: 'company',
        action: 'CREATE',
        old_values: null,
        new_values: company.toJSON(), 
        userId: req.auth.userId,
      });

      return res.status(201).json({ message: 'Company created successfully', company: company.toJSON() });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating company', error });
    }
  },

  updateCompany: async (req, res) => {
    try {
      const { id_company } = req.params;
      const {
        name,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
      } = req.body;

      const company = await Company.findByPk(id_company);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const oldValues = company.toJSON();

      let logo = company.logo;
      if (req.file) {
        logo = req.file.buffer;
      }

      await company.update({
        name,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        logo,
      });

      await createAudit({
        table_name: 'company',
        action: 'UPDATE',
        old_values: oldValues,
        new_values: company.toJSON(),
        userId: req.auth.userId,
      });

      return res.status(200).json({ message: 'Company updated successfully', company: company.toJSON() });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating company', error });
    }
  },

  deleteCompany: async (req, res) => {
    try {
      const { id_company } = req.params;

      const company = await Company.findByPk(id_company);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const oldValues = company.toJSON();

      await company.destroy();

      await createAudit({
        table_name: 'company',
        action: 'DELETE',
        old_values: oldValues,
        new_values: null,
        userId: req.auth.userId,
      });

      return res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting company', error });
    }
  },

  getCompanies: async (req, res) => {
    try {
      const companies = await Company.findAll();

      const result = companies.map((company) => company.toJSON());

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching companies', error });
    }
  },

  getCompanyById: async (req, res) => {
    try {
      const { id_company } = req.params;
      const company = await Company.findByPk(id_company);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      return res.status(200).json(company.toJSON());
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching company', error });
    }
  },

  // TODO ERROR
  getUsersByCompanyId: async (req, res) => {
    try {
      const { id_company } = req.params;
      const company = await Company.findByPk(id_company, {
        include: {
          model: User,
          attributes: { exclude: ['password'] },
        },
      });
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      return res.status(200).json(company.Users.map((user) => user.toJSON())); // Conversion directe en JSON
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users by company', error });
    }
  },
};

module.exports = companyController;
