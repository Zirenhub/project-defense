import { Response } from 'express';
import { IUserRequest } from '../middleware/jwtAuth';
import { body, validationResult } from 'express-validator';
import TweetModel from '../models/tweet';
import LikeModel from '../models/likes';
import mongoose from 'mongoose';

export const create = [
  body('content').trim().notEmpty().isLength({ min: 1, max: 150 }),

  async (req: IUserRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }

      const { content } = req.body;

      const newTweet = new TweetModel({
        profile: req.user._id,
        content,
      });
      const newTweetLikes = new LikeModel({ tweet: newTweet._id });

      await newTweet.save();
      await newTweetLikes.save();

      return res.json({
        status: 'success',
        data: newTweet.toObject(),
        message: null,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];

export const like = async (req: IUserRequest, res: Response) => {
  try {
    const tweetId = req.params.id;
    const tweet = await TweetModel.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Tweet not found',
      });
    }

    const tweetLikes = await LikeModel.findOne({ tweet: tweet._id });
    if (!tweetLikes) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Tweet likes not found',
      });
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    tweetLikes.likes.push(req.user._id);
    tweet.likesCount = tweet.likesCount + 1;

    await tweetLikes.save({ session });
    await tweet.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      status: 'success',
      data: tweet.toObject(),
      message: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errors: null,
      message: err instanceof Error ? err.message : 'unknown',
    });
  }
};
