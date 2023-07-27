import { Document, Types } from 'mongoose';
import { ITweet } from './interfaces/ITweet';
import { IReply } from './interfaces/IReply';
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
      reply: Document<unknown, {}, IComment> &
        Omit<
          IComment & {
            _id: Types.ObjectId;
          },
          never
        >;
    }
  }
}
