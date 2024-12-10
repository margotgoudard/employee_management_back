const Company = require('../models/Company');

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

      return res.status(201).json({ message: 'Company created successfully', company });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating company', error });
    }
  },

  getCompanies: async (req, res) => {
    try {
      const companies = await Company.findAll();

      const result = companies.map((company) => {
        return {
          id_company: company.id_company,
          name: company.name,
          num_address: company.num_address,
          street_address: company.street_address,
          city_address: company.city_address,
          area_code_address: company.area_code_address,
          region_address: company.region_address,
          country_address: company.country_address,
          logo: company.logo ? company.logo.toString('base64') : null,
        };
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching companies', error });
    }
  },

  getCompanyById: async (req, res) => {
    try {
      const { id } = req.params;
      const company = await Company.findByPk(id);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const result = {
        id_company: company.id_company,
        name: company.name,
        num_address: company.num_address,
        street_address: company.street_address,
        city_address: company.city_address,
        area_code_address: company.area_code_address,
        region_address: company.region_address,
        country_address: company.country_address,
        logo: company.logo ? company.logo.toString('base64') : null,
      };

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching company', error });
    }
  },

  updateCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
      } = req.body;

      const company = await Company.findByPk(id);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

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

      return res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating company', error });
    }
  },

  deleteCompany: async (req, res) => {
    try {
      const { id } = req.params;

      const company = await Company.findByPk(id);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      await company.destroy();
      return res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting company', error });
    }
  },
};

module.exports = companyController;
