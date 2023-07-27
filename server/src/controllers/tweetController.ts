import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import TweetModel from '../models/tweet';
import LikeModel from '../models/likes';
import CommentModel from '../models/comment';
import mongoose from 'mongoose';

export const create = [
  body('content').trim().notEmpty().isLength({ min: 1, max: 150 }),

  async (req: Request, res: Response) => {
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
        profile: res.locals.user._id,
        content,
      });
      await newTweet.save();
      await newTweet.populate('profile');

      return res.json({
        status: 'success',
        data: newTweet.toObject(),
        message: null,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];

export const like = async (req: Request, res: Response) => {
  try {
    const tweet = res.locals.tweet;
    const response = await LikeModel.likeTweet(tweet._id, res.locals.user._id);
    if (response.status === 'success') {
      tweet.likesCount = response.model.likes.length;
    } else {
      return res.status(400).json({
        status: 'error',
        data: null,
        message: 'Something went wrong while trying to like',
      });
    }

    await tweet.save();

    return res.status(200).json({
      status: 'success',
      data: tweet.toObject(),
      message: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      errors: null,
      message: err instanceof Error ? err.message : 'unknown',
    });
  }
};

export const reply = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Reply cant be empty')
    .isLength({ min: 1, max: 150 })
    .withMessage('min length must be 1 and max length must be 150'),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }
      const tweet = res.locals.tweet;
      const { content } = req.body;

      const newReply = new CommentModel({
        profile: res.locals.user._id,
        tweet: tweet._id,
        content,
      });
      await newReply.populate('profile');

      const session = await mongoose.startSession();
      session.startTransaction();

      tweet.repliesCount = tweet.repliesCount + 1;
      await newReply.save({ session });
      await tweet.save({ session });

      await session.commitTransaction();

      return res.status(200).json({
        status: 'success',
        data: { ...newReply.toObject(), tweet },
        message: null,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];

export const get = async (req: Request, res: Response) => {
  try {
    const tweet = res.locals.tweet;

    return res.status(200).json({
      status: 'success',
      data: tweet.toObject(),
      message: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      errors: null,
      message: err instanceof Error ? err.message : 'unknown',
    });
  }
};

export const retweet = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Retweet cant be empty')
    .isLength({ min: 1, max: 150 })
    .withMessage('min length must be 1 and max length must be 150'),
  async (req: Request, res: Response) => {
    try {
      const tweet = res.locals.tweet;
      const { content } = req.body;

      const newRetweet = new TweetModel({
        profile: res.locals.user._id,
        content,
        retweet: {
          originalModel: 'Tweet',
          original: tweet._id,
        },
      });
      await newRetweet.populate('profile');

      const session = await mongoose.startSession();
      session.startTransaction();

      tweet.retweetsCount = tweet.retweetsCount + 1;
      await newRetweet.save({ session });
      await tweet.save({ session });

      await session.commitTransaction();

      const newRetweetObject = newRetweet.toObject();

      return res.status(200).json({
        status: 'success',
        data: {
          ...newRetweetObject,
          retweet: { ...newRetweetObject.retweet, original: tweet },
        },
        message: null,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        errors: null,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  },
];
