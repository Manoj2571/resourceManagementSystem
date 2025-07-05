import express from 'express';
import {
  getEngineers,
  getEngineerById,
  updateEngineer,
  getAvailableCapacity
} from '../controllers/engineerController.js';

const router = express.Router();

router.get('/', getEngineers);
router.get('/:id', getEngineerById);
router.post('/:id', updateEngineer);
router.get('/:id/capacity', getAvailableCapacity);

export default router;
