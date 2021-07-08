import express from 'express';
import { addStats } from '../controllers/stats';

const { Router } = express;
const router = Router();

router.post('/', addStats);

export default router;