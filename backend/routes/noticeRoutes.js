import express from 'express';
import { getNotices, createNotice, deleteNotice } from '../controllers/noticeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotices)
  .post(protect, adminOnly, createNotice);

router.route('/:id')
  .delete(protect, adminOnly, deleteNotice);

export default router;
