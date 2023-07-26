import { Types } from 'mongoose';

export interface ITweet {
  profile: Types.ObjectId;
  content: string;
  image: string;
  repliesCount: number;
  retweetsCount: number;
  likesCount: number;
  original: Types.ObjectId;
}
