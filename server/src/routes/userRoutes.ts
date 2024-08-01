import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getOtherUsers,
    uploadMiddleware
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', uploadMiddleware, registerUser);
router.post('/login', loginUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, uploadMiddleware, updateUserProfile);
router.get('/people', protect, getOtherUsers);

export default router;