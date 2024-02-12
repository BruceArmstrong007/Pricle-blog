import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Post extends Document {
  @Prop({
    required: true,
    type: [Types.ObjectId],
    validate: [(value) => value.length <= 5],
    ref: 'Tag',
  })
  tags: Types.ObjectId[];

  @Prop({
    required: true,
    maxlength: 100,
  })
  title: string;

  @Prop({
    maxlength: 300,
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    maxlength: 2000,
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
