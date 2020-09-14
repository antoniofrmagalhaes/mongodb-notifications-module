import { model, Schema, Document } from 'mongoose';

export interface INotificationDocument extends Document {
  content: string;
  read?: boolean;
}

const NotificationSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model<INotificationDocument>('Notification', NotificationSchema);
