import express from 'express';
import { getSettings, updateSettings, updateProfilePicture, deleteAccount, subscribePush } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/settings', getSettings);
router.put('/settings', protect, adminOnly, updateSettings);
router.put('/profile-picture', protect, updateProfilePicture);
router.delete('/profile', protect, deleteAccount);
router.post('/push-subscribe', protect, subscribePush);

export default router;
