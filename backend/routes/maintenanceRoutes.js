import express from 'express';
import { getMaintenanceBills, generateBill, payBill } from '../controllers/maintenanceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getMaintenanceBills)
  .post(protect, adminOnly, generateBill);

router.route('/:id/pay')
  .put(protect, payBill);

export default router;
