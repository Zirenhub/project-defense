import mongoose, { Model, Types } from 'mongoose';
import { ILike } from '../interfaces/ILike';

const Schema = mongoose.Schema;

const LikeSchema = new Schema<ILike>(
  {
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
      },
    ],
    type: {
      originalModel: {
        type: String,
        enum: ['Tweet', 'Comment'],
        required: true,
      },
      original: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        refPath: 'type.originalModel',
      },
    },
  },
  { timestamps: true }
);

LikeSchema.statics.likeTweet = async function (
  tweetId: Types.ObjectId,
  userId: string,
  context: 'Tweet' | 'Reply'
): Promise<{
  status: 'success' | 'error';
  model: ILike;
  likeOrDislike: 'like' | 'dislike';
}> {
  let model = await this.findOne({ 'type.original': tweetId });

  let likeOrDislike: 'like' | 'dislike' = 'like';

  if (!model) {
    model = await this.create({
      type: { original: tweetId, originalModel: context },
      likes: [userId],
    });
  } else {
    if (model.likes.includes(userId)) {
      model.likes = model.likes.filter(
        (id: Types.ObjectId) => id.toString() !== userId
      );
      await model.save();
      likeOrDislike = 'dislike';
    } else {
      model.likes.push(userId);
      await model.save();
    }
  }

  return { status: 'success', model, likeOrDislike };
};

interface ILikeModel extends Model<ILike, {}> {
  likeTweet(
    tweetId: Types.ObjectId,
    userId: string,
    context: 'Tweet' | 'Comment'
  ): Promise<{
    status: 'success' | 'error';
    model: ILike;
    likeOrDislike: 'like' | 'dislike';
  }>;
}

const LikeModel = mongoose.model<ILike, ILikeModel>('Like', LikeSchema);

export default LikeModel;
