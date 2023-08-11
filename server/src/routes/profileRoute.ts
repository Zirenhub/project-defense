import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  follow,
  profile,
  profileLikes,
  profileTweets,
  unfollow,
} from '../controllers/profileController';

const router = express.Router();

router.get('/:id', jwtAuth, profile);
router.get('/:id/tweets', jwtAuth, profileTweets);
router.get('/:id/likes', jwtAuth, profileLikes);
router.post('/:id/follow', jwtAuth, follow);
router.delete('/:id/follow', jwtAuth, unfollow);

export default router;
