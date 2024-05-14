import { json } from "express";
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

    // ПЕРЕНЕСТИ ЛОГИКУ В СЕРВИС
    async getCompanyData(req, res) {
        try {
            const companyId = req.params.id;
            const company = await CompanyService.getCompanyById(companyId);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.json(company.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async uploadCompanyData(req, res) {
        try {
            const companyId = req.params.id;
            const filePath = req.file.path;
            
            console.log(companyId);
            console.log(filePath);
            
            const result = await CompanyService.uploadCSVData(companyId, req.file.filename);
            
            res.json({ message: result });
        } catch (error) {
            console.log("??????");
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

    async getRevenueByMonth(req, res) {
        const companyId = req.params.id;
        try {
            const revenueData = await CompanyService.getRevenueByMonth(companyId);
            res.json(revenueData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getRevenueByMonthAndYear(req, res) {
        const companyId = req.params.id;
        try {
            const revenueData = await CompanyService.getRevenueByMonthAndYear(companyId);
            res.json(revenueData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCompaniesByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const companies = await CompanyService.getCompaniesByUserId(userId);
            res.json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default CompanyController;