import mongoose from 'mongoose';
import { IComment } from '../interfaces/IComment';

const Schema = mongoose.Schema;

const CommentSchema = new Schema<IComment>(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      required: true,
    },
    content: { type: String, required: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    repliesCount: { type: Number, required: true, default: 0 },
    retweetsCount: { type: Number, required: true, default: 0 },
    likesCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;
