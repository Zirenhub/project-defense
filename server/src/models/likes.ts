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
): Promise<{ status: 'success' | 'error'; model: ILike }> {
  let model = await this.findOne({ tweet: tweetId });

  if (!model) {
    model = await this.create({ tweet: tweetId, likes: [userId] });
  } else {
    if (!model.likes.includes(userId)) {
      model.likes.push(userId);
      await model.save();
    }
    return { status: 'error', model };
  }

  return { status: 'success', model };
};

interface ILikeModel extends Model<ILike, {}> {
  likeTweet(
    tweetId: Types.ObjectId,
    userId: string
  ): Promise<{ status: 'success' | 'error'; model: ILike }>;
}

const LikeModel = mongoose.model<ILike, ILikeModel>('Like', LikeSchema);

export default LikeModel;
