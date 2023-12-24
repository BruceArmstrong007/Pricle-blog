import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Post extends Document {
  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: 'Tag',
  })
  tags: Types.ObjectId[];

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  author: Types.ObjectId;
}
export const PostSchema = SchemaFactory.createForClass(Post);
