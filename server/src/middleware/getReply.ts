import { Response, NextFunction, Request } from 'express';
import CommentModel from '../models/comment';
import { fillTweet } from './fillTweet';

const getReply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const replyId = req.params.id;
    const reply = await CommentModel.findById(replyId).populate('profile');
    if (!reply) {
      throw new Error('Reply not found');
    }
    const tweet = await fillTweet(reply.tweet.toString());
    res.locals.reply = reply;
    res.locals.tweet = tweet;
    next();
  } catch (err) {
    return res.status(404).json({
      status: 'error',
      errors: null,
      message: err instanceof Error ? err.message : 'unknown',
    });
  }
};

export { getReply };
