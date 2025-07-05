import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  findSuitableEngineers
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.post('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/projects/:id/match-engineers', findSuitableEngineers);

export default router;
