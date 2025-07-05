import User from '../models/User.js';
import Assignment from '../models/Assignment.js';

// Get all engineers
export const getEngineers = async (req, res) => {
  try {
    const engineers = await User.find({ role: 'engineer' });
    res.json(engineers);
  } catch {
    res.status(500).json({ message: 'Failed to fetch engineers' });
  }
};

// Get engineer by ID
export const getEngineerById = async (req, res) => {
  try {
    const engineer = await User.findById(req.params.id);
    if (!engineer || engineer.role !== 'engineer') {
      return res.status(404).json({ message: 'Engineer not found' });
    }
    res.json(engineer);
  } catch {
    res.status(500).json({ message: 'Failed to fetch engineer' });
  }
};

// Create new engineer
export const createEngineer = async (req, res) => {
  try {
    const { email, name, skills, seniority, maxCapacity, department } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newEngineer = new User({
      email,
      name,
      role: 'engineer',
      skills: skills || [],
      seniority,
      maxCapacity: maxCapacity || 100,
      department,
    });
    const savedEngineer = await newEngineer.save();

    res.status(201).json({ message: 'Engineer created successfully', engineer: savedEngineer });
  } catch {
    res.status(500).json({ message: 'Failed to create engineer' });
  }
};

// Update engineer by ID
export const updateEngineer = async (req, res) => {
  try {
    const updatedEngineer = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'engineer' },
      req.body,
      { new: true }
    );
    if (!updatedEngineer) return res.status(404).json({ message: 'Engineer not found' });

    res.json({ message: 'Engineer updated successfully', engineer: updatedEngineer });
  } catch {
    res.status(500).json({ message: 'Failed to update engineer' });
  }
};

// Delete engineer by ID
export const deleteEngineer = async (req, res) => {
  try {
    const deletedEngineer = await User.findOneAndDelete({ _id: req.params.id, role: 'engineer' });
    if (!deletedEngineer) return res.status(404).json({ message: 'Engineer not found' });

    res.json({ message: 'Engineer deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to delete engineer' });
  }
};


// GET /api/engineers/:id/capacity
export const getAvailableCapacity = async (req, res) => {
  try {
    const engineerId = req.params.id;

    const engineer = await User.findById(engineerId);
    if (!engineer || engineer.role !== 'engineer') {
      return res.status(404).json({ message: 'Engineer not found' });
    }

    const today = new Date();

    // Only consider active and upcoming assignments
    const activeAssignments = await Assignment.find({
      engineerId,
      endDate: { $gte: today }
    });

    const totalAllocated = activeAssignments.reduce(
      (sum, a) => sum + a.allocationPercentage,
      0
    );

    const availableCapacity = Math.max(engineer.maxCapacity - totalAllocated, 0);

    res.json({
      engineer: engineer.name,
      maxCapacity: engineer.maxCapacity,
      allocated: totalAllocated,
      available: availableCapacity,
    });

  } catch (err) {
    console.error('Error fetching capacity:', err);
    res.status(500).json({ message: 'Error fetching engineer capacity' });
  }
};
