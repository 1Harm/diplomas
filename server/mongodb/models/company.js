import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  industry: { type: String, required: false },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  revenue: { type: Number, default: 0 }, // Total revenue of the company
  customerAcquisitionCost: { type: Number, default: 0 }, // The cost of attracting a client
  averageOrderValue: { type: Number, default: 0 }, // Average check
  conversionRate: { type: Number, default: 0 }, // Conversion rate
  churnRate: { type: Number, default: 0 }, // Customer churn rate
  returnRate: { type: Number, default: 0 }, // Percentage of refunds
  fulfillmentCosts: { type: Number, default: 0 }, // The cost of completing orders
  customerSatisfactionScores: { type: Number, default: 0 }, // Customer satisfaction indicators
  inventoryManagement: {
    totalStock: { type: Number, default: 0 },
    turnoverRate: { type: Number, default: 0 }, // Inventory turnover
  },
  marketingEfficiency: {
    campaignROI: { type: Number, default: 0 }, // Effectiveness of marketing campaigns
  },
  customerLoyalty: {
    repeatPurchaseRate: { type: Number, default: 0 }, // Frequency of repeat purchases
  },
  seasonalTrends: [{ 
    month: String, 
    sales: Number 
  }], // Seasonality and sales trends
}, {
  timestamps: true
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;