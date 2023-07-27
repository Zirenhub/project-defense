import { Request, Response } from 'express';
import CommentModel from '../models/comment';
import { body } from 'express-validator';
import { IComment } from '../interfaces/IComment';
import TweetModel from '../models/tweet';

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
      await newReply.save();

      return res.status(200).json({
        status: 'success',
        data: { ...newReply.toObject(), parent: reply.toObject() },
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
    const reply = res.locals.reply;
    const tweet = res.locals.tweet;

    const fetchCommentHierarchy = async (
      comment: IComment
    ): Promise<IComment[]> => {
      const hierarchy: IComment[] = [comment];

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

    const commentHierarchy = await fetchCommentHierarchy(reply.toObject());

    return res.status(200).json({
      status: 'success',
      data: { tweet, replies: commentHierarchy },
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
