import express from 'express';
import CompanyController from '../controllers/company.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticate, CompanyController.createCompany);
router.get('/:id', authenticate, CompanyController.geCompany);
router.put('/:id', authenticate, CompanyController.updateCompany);
router.delete('/:id', authenticate, CompanyController.deleteCompany);

export default router;