import { Request, Response } from 'express';
import TweetModel from '../models/tweet';
import { getExtraTweetInfo } from './tweetController';
import ProfileModel from '../models/profile';
import LikeModel from '../models/likes';
import { ITweet } from '../interfaces/ITweet';
import mongoose from 'mongoose';

export const profileTweets = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.id;
    const userId = res.locals.user._id;
    const tweets = await TweetModel.find({ profile: profileId })
      .sort({ createdAt: -1 })
      .populate('profile')
      .populate({
        path: 'retweet.original',
        populate: {
          path: 'profile',
        },
      });

    const modifiedTweets = await getExtraTweetInfo(tweets, userId);

    return res.json({
      status: 'success',
      data: modifiedTweets,
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

export const profile = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.id;
    const profile = await ProfileModel.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Profile not found',
      });
    }

    return res.json({
      status: 'success',
      data: profile.toObject(),
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

export const profileLikes = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.id;
    const userId = res.locals.user._id;
    const likes = await LikeModel.find({
      likes: { $in: [profileId] },
    }).populate({
      path: 'type.original',
      populate: {
        path: 'profile',
      },
    });

    // .populate({
    //   path: 'tweet.retweet.original',
    //   populate: {
    //     path: 'profile',
    //   },
    // });

    // fix type later, shows array of object ids even tho we populated the tweet above
    const likedTweets = likes.map((t) => t.type.original) as any;
    const modifiedTweets = (await getExtraTweetInfo(likedTweets, userId)).sort(
      (a, b) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    );

    return res.json({
      status: 'success',
      data: modifiedTweets,
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

export const follow = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.id;
    const userId = res.locals.user._id;
    const profile = await ProfileModel.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Profile not found',
      });
    }
    const userIdObject = new mongoose.Types.ObjectId(userId);
    if (profile._id === userIdObject) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You cant follow yourself',
      });
    }
    if (profile.followers.includes(userIdObject)) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'Profile is already being followed',
      });
    }
    profile.followers.push(userIdObject);
    await profile.save();

    return res.json({
      status: 'success',
      data: profile,
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

export const unfollow = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.id;
    const userId = res.locals.user._id;
    const profile = await ProfileModel.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Profile not found',
      });
    }
    const userIdObject = new mongoose.Types.ObjectId(userId);
    if (profile._id === userIdObject) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You cant unfollow yourself',
      });
    }
    // not necessary
    if (!profile.followers.includes(userIdObject)) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'Profile is not being followed',
      });
    }
    // find a way to update the followers list
    const unFollowed = profile.followers.filter((f) => f !== userIdObject);
    profile.followers = unFollowed;
    await profile.save();

    return res.json({
      status: 'success',
      data: profile,
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
