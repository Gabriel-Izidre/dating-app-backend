import mongoose, { Schema, Types } from 'mongoose';
import { ActionType } from '../enum/action-type';

export interface IAction {
  senderId: Types.ObjectId;
  targetId: Types.ObjectId;
  action: ActionType;
  createdAt?: Date;
  updatedAt?: Date;
}

const ActionSchema = new Schema<IAction>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: Number, enum: [ActionType.LIKE, ActionType.DISLIKE], required: true },
  },
  { timestamps: true }
);

const ActionModel = mongoose.models.Action || mongoose.model<IAction>('Action', ActionSchema);

export default ActionModel;
