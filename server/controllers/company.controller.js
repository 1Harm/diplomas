import CompanyService from "../application/company.service.js";

const CompanyController = {
    async createCompany(req, res) {
        try {
            const newCompany = await CompanyService.createCompany(req.body);
            res.status(201).json(newCompany);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCompanyByUserId(req, res) {
        try {
            const userId = req.user.userId;
            const companies = await CompanyService.getCompaniesByUserId(userId);
            res.json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async geCompany(req, res) {
        try {
            const companyId = req.params.id;
            const company = await CompanyService.getCompanyById(companyId);
            if (!company) {
                return res.status(404).json({ message: 'Company didnt find' });
            }
            res.json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateCompany(req, res) {
        try {
            const companyId = req.params.id;
            const updatedCompany = await CompanyService.updateCompany(companyId, req.body);
            if (!updatedCompany) {
                return res.status(404).json({ message: 'Company didnt find' });
            }
            res.json(updatedCompany);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteCompany(req, res) {
        try {
            const companyId = req.params.id;
            const deletedCompany = await CompanyService.deleteCompany(companyId);
            if (!deletedCompany) {
                return res.status(404).json({ message: 'Company didnt find' });
            }
            res.json({ message: 'Company created successfully!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default CompanyController;