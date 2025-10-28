import mongoose, { Schema } from 'mongoose';
import { Gender } from '../enum/gender';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  password: string;
  gender: Gender;
  preference: Gender;
  profilePhotoUrl?: string;
  galleryPhotoUrls?: string[];
  interests?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    preference: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    profilePhotoUrl: { type: String },
    galleryPhotoUrls: [{ type: String }],
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
