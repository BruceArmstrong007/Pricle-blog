import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ContactStatus } from '@app/common';
import { Tag } from '../schema/tag.schema';
@Injectable()
export class TagRepository {
  protected readonly logger = new Logger(TagRepository.name);

  constructor(@InjectModel(Tag.name) public readonly tagModel: Model<Tag>) {}

  async getTags(key: string): Promise<Tag[] | null> {
    const regex = new RegExp(key, 'i');
    return await this.tagModel
      .find({
        name: regex,
      })
      .exec();
  }

  async createTag(name: string) {
    const newUser = new this.tagModel({
      name,
    });
    return await newUser.save();
  }
}
