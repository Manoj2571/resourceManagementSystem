import express from 'express';
import { registerUser, loginUser, getUsers, getUserById, updateUser, getProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/:id', authMiddleware, updateUser);

export default router;
