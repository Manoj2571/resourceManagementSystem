import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  engineerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  allocationPercentage: { type: Number, min: 0, max: 100, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  role: { type: String, trim: true }, // e.g., 'Developer', 'Tech Lead'
}, {
  timestamps: true,
});

export default mongoose.model('Assignment', assignmentSchema);
