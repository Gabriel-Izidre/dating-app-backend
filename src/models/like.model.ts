//Provisório
import mongoose, { Schema, Types } from 'mongoose';

export interface ILike {
  likerId: Types.ObjectId;
  likedId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const LikeSchema = new Schema<ILike>(
  {
    likerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likedId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const LikeModel = mongoose.models.Like || mongoose.model<ILike>('Like', LikeSchema);

export default LikeModel;
