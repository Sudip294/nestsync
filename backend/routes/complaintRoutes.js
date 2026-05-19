import express from 'express';
import { getComplaints, createComplaint, updateComplaintStatus } from '../controllers/complaintController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getComplaints)
  .post(protect, createComplaint);

router.route('/:id')
  .put(protect, updateComplaintStatus);

export default router;
