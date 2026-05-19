import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['plumbing', 'electrical', 'cleaning', 'security', 'other'], default: 'other' },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adminComments: { type: String }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
