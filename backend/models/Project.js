import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  requiredSkills: { type: [String], required: true, default: [] },
  teamSize: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['planning', 'active', 'completed'], default: 'planning' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
