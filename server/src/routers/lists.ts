import express from 'express';
import { getLists, addList, removeList } from '../controllers/lists';

const { Router } = express;
const router = Router();

router.get('/', getLists);
router.post('/', addList);
router.delete('/:id', removeList);

export default router;
