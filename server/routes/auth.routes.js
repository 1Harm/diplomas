<<<<<<< HEAD
import express from "express";
import {
  signUpValidationRules,
  signInValidationRules,
} from "../application/validators/auth.validator.js";
import AuthController from "../controllers/auth.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/signup", signUpValidationRules(), AuthController.signUp);
router.post("/signin", signInValidationRules(), AuthController.signIn);
router.get("/check-token", authenticate, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
=======
import express from 'express';
import { signUpValidationRules, signInValidationRules } from '../application/validators/auth.validator.js';
import AuthController from '../controllers/auth.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signUpValidationRules(), AuthController.signUp);
router.post('/signin', signInValidationRules(), AuthController.signIn);
router.get('/check-token', authenticate, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44
});

export default router;
