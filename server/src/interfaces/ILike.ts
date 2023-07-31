import { Types } from 'mongoose';

export interface ILike {
  likes: Types.ObjectId[];
  type: {
    originalModel: 'Tweet' | 'Comment';
    original: Types.ObjectId;
  };
}
