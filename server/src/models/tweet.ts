import mongoose from 'mongoose';
import { ITweet } from '../interfaces/ITweet';

const Schema = mongoose.Schema;

const TweetSchema = new Schema<ITweet>(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    content: { type: String, required: true },
    image: { type: String, default: null },
    repliesCount: { type: Number, required: true, default: 0 },
    retweetsCount: { type: Number, required: true, default: 0 },
    likesCount: { type: Number, required: true, default: 0 },
    retweet: {
      originalModel: {
        type: String,
        enum: ['tweet', 'reply', null],
        default: null,
      },
      original: {
        type: Schema.Types.ObjectId,
        default: null,
        refPath: 'retweet.originalModel',
      },
    },
  },
  { timestamps: true }
);

const TweetModel = mongoose.model<ITweet>('Tweet', TweetSchema);

export default TweetModel;
