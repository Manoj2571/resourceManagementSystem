import Project from '../models/Project.js';
import User from '../models/User.js';

// Get all projects (optional filter by name)
export const getProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.name) filter.name = req.query.name;

    const projects = await Project.find(filter);
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new project (check for duplicate)
export const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const existingProject = await Project.findOne({ name });
    if (existingProject) return res.status(400).json({ message: 'Project already exists' });

    const newProject = new Project(req.body);
    const savedProject = await newProject.save();

    res.status(201).json({ message: 'New project created successfully', project: savedProject });
  } catch (err) {
    res.status(500).json({ message: 'Project creation failed' });
    console.log(err)
  }
};

// Update project using POST instead of PUT
export const updateProject = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated successfully', project: updatedProject });
  } catch {
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to delete project' });
  }
};


// GET /api/projects/:id/match-engineers
export const findSuitableEngineers = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const requiredSkills = project.requiredSkills;

    // Find engineers with at least one matching skill
    const suitableEngineers = await User.find({
      role: 'engineer',
      skills: { $in: requiredSkills }
    });

    res.json({
      project: project.name,
      requiredSkills,
      suitableEngineers,
    });
  } catch (error) {
    console.error('Error finding suitable engineers:', error);
    res.status(500).json({ message: 'Error finding suitable engineers' });
  }
};

