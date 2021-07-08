import express from 'express';
import { addHabit, removeHabit, markHabitAsComplete, markHabitAsIncomplete } from '../controllers/habits';

const { Router } = express;
const router = Router();

router.post('/', addHabit);
router.delete('/:id', removeHabit);

router.patch('/:id/complete', markHabitAsComplete);
router.patch('/:id/incomplete', markHabitAsIncomplete);

export default router;