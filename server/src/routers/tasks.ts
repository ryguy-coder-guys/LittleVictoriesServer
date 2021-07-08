import express from 'express';
import {
  getTasks,
  addTask,
  removeTask,
  markTaskAsComplete,
  markTaskAsIncomplete,
  markTaskAsPublic,
  markTaskAsPrivate,
  getFeedItems,
} from '../controllers/tasks';

const { Router } = express;
const router = Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', removeTask);

router.patch('/:id/complete', markTaskAsComplete);
router.patch('/:id/incomplete', markTaskAsIncomplete);

router.patch('/:id/public', markTaskAsPublic);
router.patch('/:id/private', markTaskAsPrivate);

router.get('/:id', getFeedItems);

export default router;
