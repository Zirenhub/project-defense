import { Types } from 'mongoose';

export interface ITweet {
  _id: Types.ObjectId;
  profile: Types.ObjectId;
  content: string;
  image: string | null;
  repliesCount: number;
  retweetsCount: number;
  likesCount: number;
  retweet: {
    originalModel: 'Tweet' | 'Comment' | null;
    original: Types.ObjectId | null;
  };
}
