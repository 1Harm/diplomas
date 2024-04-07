import express from 'express';
import { signUpValidationRules, signInValidationRules } from '../application/validators/auth.validator.js';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUpValidationRules(), AuthController.signUp);
router.post('/signin', signInValidationRules(), AuthController.signIn);

export default router;
