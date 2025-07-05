import express from 'express';
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAvailableCapacity,
  findSuitableEngineers,
} from '../controllers/assignmentController.js';

const router = express.Router();

router.get('/', getAssignments);
router.post('/', createAssignment);
router.post('/:id', updateAssignment); 
router.delete('/:id', deleteAssignment);

// Additional Functional Endpoints
router.get('/capacity/:engineerId', getAvailableCapacity);
router.get('/suitable-engineers/:projectId', findSuitableEngineers);

export default router;
