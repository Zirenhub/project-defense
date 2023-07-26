import { Types } from 'mongoose';

export interface ILike {
  tweet: Types.ObjectId;
  likes: Types.ObjectId[];
}
