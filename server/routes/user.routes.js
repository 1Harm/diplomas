import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', UserController.register);

router.get('/:id', UserController.getUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

export default router;