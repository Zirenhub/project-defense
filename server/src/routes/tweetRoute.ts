import express from 'express';
import { create, like, reply } from '../controllers/tweetController';
import { jwtAuth } from '../middleware/jwtAuth';
import { getTweet } from '../middleware/getTweet';

const router = express.Router();

router.post('/', jwtAuth, create);
router.post('/:id', jwtAuth, getTweet, reply);
router.post('/:id/like', jwtAuth, getTweet, like);

export default router;
