import { Types } from 'mongoose';

export interface IComment {
  profile: Types.ObjectId;
  tweet: Types.ObjectId;
  content: string;
  parentId: Types.ObjectId | null;
  repliesCount: number;
  retweetsCount: number;
  likesCount: number;
}
