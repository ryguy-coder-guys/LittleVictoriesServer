import express from 'express';
import { toggleReadableFontOn, toggleReadableFontOff } from '../controllers/font';

const { Router } = express;
const router = Router();

router.patch('/:id/toggleOn', toggleReadableFontOn);
router.patch('/:id/toggleOff', toggleReadableFontOff);

export default router;