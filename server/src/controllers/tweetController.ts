import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import TweetModel from '../models/tweet';
import LikeModel from '../models/likes';
import CommentModel from '../models/comment';
import mongoose, { Document } from 'mongoose';

const getExtraTweetInfo = async (tweets: Document[], userId: string) => {
  const filledTweets = await Promise.all(
    tweets.map(async (tweet) => {
      const isLiked = await LikeModel.exists({
        tweet: tweet._id,
        likes: userId,
      });
      const isRetweeted = await TweetModel.find({
        'retweet.original': tweet._id,
        profile: userId,
      });

      return {
        ...tweet.toObject(),
        isLiked: isLiked ? true : false,
        isRetweeted: isRetweeted.length > 0 ? true : false,
      };
    })
  );

  return filledTweets.length === 1 ? filledTweets[0] : filledTweets;
};

export const create = [
  body('content').isLength({ min: 1, max: 150 }),

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
    const userId = res.locals.user._id;
    const replies = await CommentModel.find({
      tweet: tweet._id,
      parent: null,
    })
      .populate('profile')
      .sort({ createdAt: 1 });

    const modifiedTweet = await getExtraTweetInfo([tweet], userId);
    const modifedReplies = await getExtraTweetInfo(replies, userId);

    return res.status(200).json({
      status: 'success',
      data: { tweet: modifiedTweet, replies: modifedReplies },
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
    .isLength({ min: 1, max: 150 })
    .withMessage('Retweet content length must be 1 and max length must be 150'),
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

export const timeline = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const timeline = await TweetModel.find()
      .sort({ createdAt: -1 })
      .populate('profile')
      .populate({
        path: 'retweet.original',
        populate: {
          path: 'profile',
        },
      });

    const modifiedTimeline = await getExtraTweetInfo(timeline, userId);

    return res.status(200).json({
      status: 'success',
      data: modifiedTimeline,
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
