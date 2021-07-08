import express from 'express';
import { likeTask } from '../controllers/likes';
import { unlikeTask } from '../controllers/likes';

const { Router } = express;
const router = Router();

router.post('/', likeTask);
router.delete('/:userId/:taskId', unlikeTask);

export default router;
