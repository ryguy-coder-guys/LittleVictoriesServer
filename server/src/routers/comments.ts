import { addComment, removeComment } from '../controllers/comments';
import express from 'express';

const { Router } = express;
const router = Router();

router.post('/', addComment);
router.delete('/:id', removeComment);

export default router;
