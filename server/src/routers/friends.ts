import express from 'express';
import { addFriend, removeFriend } from '../controllers/friends'

const { Router } = express;
const router = Router();

router.post('/', addFriend);
router.delete('/:userId/:friendId', removeFriend)


export default router;