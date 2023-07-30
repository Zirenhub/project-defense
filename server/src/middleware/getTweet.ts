import { Response, NextFunction, Request } from 'express';
import { fillTweet } from './fillTweet';

const getTweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tweetId = req.params.id;
    const tweet = await fillTweet(tweetId);
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

export { getTweet };
