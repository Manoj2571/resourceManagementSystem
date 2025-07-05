import Assignment from '../models/Assignment.js';
import User from '../models/User.js';
import Project from '../models/Project.js';

// Helper: Get active assignments for an engineer
const getActiveAssignments = async (engineerId) => {
  const now = new Date();
  return Assignment.find({
    engineerId,
    startDate: { $lte: now },
    endDate: { $gte: now }
  });
};

// Calculate available capacity for engineer
export const getAvailableCapacity = async (req, res) => {
  try {
    const { engineerId } = req.params;
    const engineer = await User.findById(engineerId);
    if (!engineer) return res.status(404).json({ message: 'Engineer not found' });

    const activeAssignments = await getActiveAssignments(engineerId);
    const totalAllocated = activeAssignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
    const availableCapacity = engineer.maxCapacity - totalAllocated;

    res.json({ engineerId, availableCapacity });
  } catch {
    res.status(500).json({ message: 'Failed to get capacity' });
  }
};

// Create new assignment
export const createAssignment = async (req, res) => {
  try {
    const { engineerId, projectId, allocationPercentage, startDate, endDate, role } = req.body;

    const newAssignment = new Assignment({
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    });
    const savedAssignment = await newAssignment.save();

    res.status(201).json({ message: 'Assignment created successfully', assignment: savedAssignment });
  } catch {
    res.status(500).json({ message: 'Failed to create assignment' });
  }
};

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('engineerId', 'name skills maxCapacity')
      .populate('projectId', 'name requiredSkills status');
    res.json(assignments);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update assignment via POST
export const updateAssignment = async (req, res) => {
  try {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ message: 'Assignment ID is required' });

    const updatedAssignment = await Assignment.findByIdAndUpdate(_id, updates, { new: true });
    if (!updatedAssignment) return res.status(404).json({ message: 'Assignment not found' });

    res.json({ message: 'Assignment updated successfully', assignment: updatedAssignment });
  } catch {
    res.status(500).json({ message: 'Failed to update assignment' });
  }
};

// Delete assignment by ID
export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Assignment deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to delete assignment' });
  }
};

// Find suitable engineers for project (skill matching)
export const findSuitableEngineers = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const allEngineers = await User.find({ role: 'engineer' });
    const suitableEngineers = allEngineers.filter(engineer =>
      project.requiredSkills.some(skill => engineer.skills.includes(skill))
    );

    res.json(suitableEngineers);
  } catch {
    res.status(500).json({ message: 'Failed to find suitable engineers' });
  }
};
