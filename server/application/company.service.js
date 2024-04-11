import CompanyRepository from "../mongodb/company.repository";

const CompanyService = {
    async createCompany(companyData) {
        return CompanyRepository.createCompany(companyData);
    },

    async getCompanyById(companyId) {
        return CompanyRepository.findCompanyById(companyId);
    },

    async updateCompany(companyId, companyData) {
        return CompanyRepository.updateCompany(companyId, companyData);
    },

    async deleteCompany(companyId) {
        return CompanyRepository.deleteCompany(companyId);
    },
};

export default CompanyService;