import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import { reply, get } from '../controllers/commentController';
import { getReply } from '../middleware/getReply';

const router = express.Router();

// router.get('/') get all replies ?

router.get('/:id', getReply, get);
router.post('/:id', jwtAuth, reply);

export default router;
