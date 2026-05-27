import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'resident'], default: 'resident' },
  flatNumber: { type: String, required: function() { return this.role === 'resident'; } },
  contactNumber: { type: String },
  profilePicture: { type: String }, // Base64 string under 2MB
  otp: { type: String },
  otpExpires: { type: Date },
  pushSubscriptions: { type: Array, default: [] }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
