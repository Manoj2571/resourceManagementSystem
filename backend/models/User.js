import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { 
    type: String, 
    enum: ['engineer', 'manager'], 
    required: true 
  },

  // Engineer-specific fields
  skills: { type: [String], default: [] },
  seniority: { 
    type: String, 
    enum: ['junior', 'mid', 'senior'] 
  },
  maxCapacity: { type: Number, default: 100 }, // 100 = full-time, 50 = part-time
  department: { type: String, trim: true }
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });

export default mongoose.model('User', userSchema);
