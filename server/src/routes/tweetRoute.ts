import express from 'express';
import { create, like } from '../controllers/tweetController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router();

router.post('/', jwtAuth, create);
router.post('/:id', jwtAuth); // comment
router.post('/:id/like', jwtAuth, like);

export default router;
