import express from 'express';
import {
  create,
  like,
  reply,
  get,
  retweet,
  timeline,
  following,
  trending,
} from '../controllers/tweetController';
import { jwtAuth } from '../middleware/jwtAuth';
import { getTweet } from '../middleware/getTweet';

const router = express.Router();

router.post('/', jwtAuth, create);
// router.get('/', jwtAuth,) get user's all tweets

router.get('/timeline', jwtAuth, timeline);
router.get('/following', jwtAuth, following);
router.get('/trending', jwtAuth, trending);

router.post('/:id', jwtAuth, getTweet, reply);
router.get('/:id', jwtAuth, getTweet, get);

router.post('/:id/like', jwtAuth, getTweet, like);

router.post('/:id/retweet', jwtAuth, getTweet, retweet);

export default router;
