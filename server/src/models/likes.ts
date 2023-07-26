import mongoose from 'mongoose';
import { ILike } from '../interfaces/ILike';

const Schema = mongoose.Schema;

const LikeSchema = new Schema<ILike>({
  tweet: { type: Schema.Types.ObjectId, required: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
  ],
});

const LikeModel = mongoose.model<ILike>('Like', LikeSchema);

export default LikeModel;
