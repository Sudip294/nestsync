import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  societyName: { type: String, default: 'SmartNest Co-op' },
  societyLogo: { type: String }, // Base64 string under 2MB
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
