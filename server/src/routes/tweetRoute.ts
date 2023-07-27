import express from 'express';
import {
  create,
  like,
  reply,
  get,
  retweet,
} from '../controllers/tweetController';
import { jwtAuth } from '../middleware/jwtAuth';
import { getTweet } from '../middleware/getTweet';

const router = express.Router();

router.post('/', jwtAuth, create);
// router.get('/', jwtAuth,) get user's all tweets

router.post('/:id', jwtAuth, getTweet, reply);
router.get('/:id', getTweet, get);

router.post('/:id/like', jwtAuth, getTweet, like);

router.post('/:id/retweet', jwtAuth, getTweet, retweet);

export default router;
