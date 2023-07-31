import { Request, Response } from 'express';
import CommentModel from '../models/comment';
import { body } from 'express-validator';
import { IComment } from '../interfaces/IComment';
import LikeModel from '../models/likes';
import { getExtraTweetInfo } from './tweetController';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export const reply = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Reply cant be empty')
    .isLength({ min: 1, max: 150 })
    .withMessage('min length must be 1 and max length must be 150'),
  async (req: Request, res: Response) => {
    try {
      const replyId = req.params.id;
      const reply = await CommentModel.findById(replyId);
      if (!reply) {
        return res.status(404).json({
          status: 'error',
          errors: null,
          message: 'Reply not found',
        });
      }
      const { content } = req.body;

      const newReply = new CommentModel({
        profile: res.locals.user._id,
        tweet: reply.tweet._id,
        content,
        parent: reply._id,
      });
      await newReply.populate('profile tweet');
      reply.repliesCount = reply.repliesCount + 1;

      const session = await mongoose.startSession();
      session.startTransaction();

      await newReply.save({ session });
      await reply.save({ session });

      await session.commitTransaction();

      return res.status(200).json({
        status: 'success',
        data: { ...newReply.toObject(), parent: reply._id },
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
    const userId = res.locals.user._id;
    const reply = res.locals.reply;
    const tweet = res.locals.tweet;

    const fetchCommentHierarchy = async (
      comment: Document<unknown, {}, IComment> & Omit<any, never>
    ) => {
      const hierarchy = [comment];

      if (comment.parent) {
        const parent = await CommentModel.findById(comment.parent).populate(
          'profile'
        );

        if (parent) {
          const parentHierarchy = await fetchCommentHierarchy(parent);
          hierarchy.unshift(...parentHierarchy);
        }
      }

      return hierarchy;
    };

    const commentHierarchy = await fetchCommentHierarchy(reply);
    const childrenReplies = await CommentModel.find({ parent: reply._id })
      .populate('profile')
      .sort({ createdAt: 1 });

    const modifiedTweet = await getExtraTweetInfo([tweet], userId);
    const modifedReplies = await getExtraTweetInfo(commentHierarchy, userId);
    const modifiedChildrenReplies = await getExtraTweetInfo(
      childrenReplies,
      userId
    );

    const requestedReply = modifedReplies.pop();

    return res.status(200).json({
      status: 'success',
      data: {
        tweet: modifiedTweet[0],
        parents: modifedReplies,
        reply: requestedReply,
        children: modifiedChildrenReplies,
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
};

export const like = async (req: Request, res: Response) => {
  try {
    const replyId = req.params.id;
    const reply = await CommentModel.findById(replyId);
    if (!reply) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Reply not found',
      });
    }
    const response = await LikeModel.likeTweet(reply._id, res.locals.user._id);

    if (response.status === 'success') {
      reply.likesCount = response.model.likes.length;
    } else {
      return res.status(400).json({
        status: 'error',
        data: null,
        message: 'Something went wrong while trying to like',
      });
    }

    await reply.save();

    return res.status(200).json({
      status: 'success',
      data: { _id: reply._id, likeOrDislike: response.likeOrDislike },
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
