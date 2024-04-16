import CompanyRepository from "../mongodb/company.repository.js";

const CompanyService = {
    async createCompany(companyData) {
        return CompanyRepository.createCompany(companyData);
    },

    async getCompanyById(companyId) {
        return CompanyRepository.findCompanyById(companyId);
    },

    async getCompaniesByUserId(userId) {
        return CompanyRepository.findCompaniesByUserId(userId);
    },

    async updateCompany(companyId, companyData) {
        return CompanyRepository.updateCompany(companyId, companyData);
    },

    async deleteCompany(companyId) {
        return CompanyRepository.deleteCompany(companyId);
    },

    async calculateMarketingROI(companyId) {
        const company = await this.getCompanyById(companyId);
        if (!company) throw new Error("Company not found");

        const { marketingInvestment, revenue } = company;
        if (marketingInvestment === 0) return 0;
        const roi = (revenue - marketingInvestment) / marketingInvestment * 100;
        return roi.toFixed(2);
    },

    async inventoryTurnoverRatio(companyId) {
        const company = await this.getCompanyById(companyId);
        if (!company) throw new Error("Company not found");

        const { costOfGoodsSold, averageInventory } = company;
        if (averageInventory === 0) return 0;
        const turnover = costOfGoodsSold / averageInventory;
        return turnover.toFixed(2);
    },

    async checkUserAccessToCompany(userId, companyId) {
        // Проверяем, есть ли в базе данных запись, связывающая пользователя с компанией
        const company = await CompanyRepository.findCompanyById(companyId);
        if (!company) return false;
        
        // Проверяем, содержится ли userId среди сотрудников компании или является ли пользователь владельцем
        return company.owner === userId || company.employees.includes(userId);
    },
};

export default CompanyService;