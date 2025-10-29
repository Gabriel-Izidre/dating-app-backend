import mongoose, { Schema } from 'mongoose';

export interface IInterest {
  name: string;
  iconName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const InterestSchema = new Schema<IInterest>(
  {
    name: { type: String, required: true, unique: true },
    iconName: { type: String, required: true },
  },
  { timestamps: true }
);

const InterestModel = mongoose.models.Interest || mongoose.model<IInterest>('Interest', InterestSchema);

export default InterestModel;
