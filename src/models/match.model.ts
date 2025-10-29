
import mongoose, { Schema, Types } from 'mongoose';

export interface IMatch {
  user1: Types.ObjectId;
  user2: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const matchSchema = new Schema<IMatch>(
  {
    user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const MatchModel = mongoose.models.Match || mongoose.model<IMatch>('Match', matchSchema);

export default MatchModel;
