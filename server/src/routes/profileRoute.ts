import express from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  profile,
  profileLikes,
  profileTweets,
} from '../controllers/profileController';

const router = express.Router();

router.get('/:id', jwtAuth, profile);
router.get('/:id/tweets', jwtAuth, profileTweets);
router.get('/:id/likes', jwtAuth, profileLikes);

export default router;
