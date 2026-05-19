import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' },
  dueDate: { type: Date, required: true },
  paidDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Maintenance', maintenanceSchema);
