import fs from 'fs';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import CompanyRepository from "../mongodb/company.repository.js";
import csv from 'csv-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

    async uploadCompanyData(companyId, newData) {
        const company = await CompanyRepository.findCompanyById(companyId);
        if (!company) throw new Error("Company not found");

        company.data = newData;
        await company.save();
        return company;
    },

    async uploadCSVData(companyId, fileName) {
        const filePath = path.join(__dirname, '/uploads/', fileName);

        if (!fs.existsSync(filePath) || path.extname(fileName) !== '.csv') {
            throw new Error('File not found or has an unsupported extension');
        }

        return new Promise((resolve, reject) => {
            const results = {};
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', async (row) => {
                    try {
                        const rowData = this.prepareDataForCompany(row);

                        for (const key in rowData) {
                            if (!(key in results)) {
                                results[key] = [];
                            }
                            results[key].push(rowData[key]);
                        }
                    } catch (error) {
                        reject(new Error('Error processing CSV data:', error));
                    }
                })
                .on('end', async () => {
                    try {
                        const company = await CompanyRepository.findCompanyById(companyId);
                        if (!company) {
                            throw new Error("Company not found");
                        }

                        company.data = results;
                        await company.save();

                        resolve('CSV data uploaded successfully');
                    } catch (error) {
                        reject(new Error('Error saving company data:', error));
                    }
                    // resolve(results);
                })
                .on('error', (err) => {
                    reject(new Error('Error reading CSV file:', err));
                });
        });
    },

    prepareDataForCompany(csvRow) {
        const data = {};
        for (const columnName in csvRow) {
            let value = csvRow[columnName];
    
            if (!isNaN(value)) {
                if (value.includes(',')) {
                    value = parseFloat(value.replace(',', '.'));
                } else {
                    value = parseFloat(value);
                }
            } else {
                const date = Date.parse(value);
                if (!isNaN(date)) {
                    value = new Date(date);
                }
            }
    
            data[columnName] = value;
        }
        return data;
    },

    async getRevenueByMonthAndYear(companyId) {
        try {
            const company = await CompanyRepository.findCompanyById(companyId);
            if (!company) throw new Error("Company not found");
    
            const revenueData = company.data['Total'];
            const revenueByMonthAndYear = {};
    
            revenueData.forEach((total, index) => {
                const date = new Date(company.data['Date'][index]);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                if (!revenueByMonthAndYear[year]) {
                    revenueByMonthAndYear[year] = {};
                }
                if (!revenueByMonthAndYear[year][month]) {
                    revenueByMonthAndYear[year][month] = 0;
                }
                revenueByMonthAndYear[year][month] += total;
            });
    
            return revenueByMonthAndYear;
        } catch (error) {
            console.error("Error in getRevenueByMonthAndYear:", error.message);
            throw new Error(error.message);
        }
    },

    async getCompaniesByUserId(userId) {
        return CompanyRepository.findCompaniesByUserId(userId);
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
        const company = await CompanyRepository.findCompanyById(companyId);
        if (!company) return false;

        return company.owner === userId || company.employees.includes(userId);
    },
};

export default CompanyService;