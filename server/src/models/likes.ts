import mongoose, { Model, Types } from 'mongoose';
import { ILike } from '../interfaces/ILike';

const Schema = mongoose.Schema;

const LikeSchema = new Schema<ILike>({
  tweet: { type: Schema.Types.ObjectId, required: true, unique: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
  ],
});

LikeSchema.statics.likeTweet = async function (
  tweetId: Types.ObjectId,
  userId: string
): Promise<{
  status: 'success' | 'error';
  model: ILike;
  likeOrDislike: 'like' | 'dislike';
}> {
  let model = await this.findOne({ tweet: tweetId });

  let likeOrDislike: 'like' | 'dislike' = 'like';

  if (!model) {
    model = await this.create({ tweet: tweetId, likes: [userId] });
  } else {
    if (model.likes.includes(userId)) {
      model.likes = model.likes.filter(
        (x: mongoose.Schema.Types.ObjectId) => x.toString() !== userId
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
    userId: string
  ): Promise<{
    status: 'success' | 'error';
    model: ILike;
    likeOrDislike: 'like' | 'dislike';
  }>;
}

const LikeModel = mongoose.model<ILike, ILikeModel>('Like', LikeSchema);

export default LikeModel;
