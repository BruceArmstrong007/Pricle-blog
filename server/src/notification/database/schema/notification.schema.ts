import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Notification extends Document {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  userID: Types.ObjectId;

  @Prop()
  subject?: string;

  @Prop()
  message?: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  data: object | null;

  @Prop({
    required: true,
  })
  type: NotificationType;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

export type NotificationType = 'SYSTEM' | 'USER' | 'CONTACT';
