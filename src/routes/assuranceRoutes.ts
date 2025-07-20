import express from 'express';
import {
  getAllAssurances,
  createAssurance,
  updateAssurance,
  deleteAssurance
} from '../controllers/assuranceControllers';

const router = express.Router();

router.get('/', getAllAssurances);
router.post('/', createAssurance);
router.put('/:id', updateAssurance);
router.delete('/:id', deleteAssurance);

export default router;
