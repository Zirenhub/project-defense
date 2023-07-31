import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import { reply, get, like, retweet } from '../controllers/commentController';
import { getReply } from '../middleware/getReply';

const router = express.Router();

// router.get('/') get all replies ?

router.get('/:id', jwtAuth, getReply, get);
router.post('/:id', jwtAuth, reply);
router.post('/:id/like', jwtAuth, like);
router.post('/:id/retweet', jwtAuth, getReply, retweet);

export default router;
