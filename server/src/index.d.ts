import { Document, Types } from 'mongoose';
import { ITweet } from './interfaces/ITweet';
import { User } from './middleware/jwtAuth';

declare global {
  namespace Express {
    interface Locals {
      tweet: Document<unknown, {}, ITweet> &
        Omit<
          ITweet & {
            _id: Types.ObjectId;
          },
          never
        >;
      user: User;
    }
  }
}
