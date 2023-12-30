import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      .select('-createdAt')
      .select('-updatedAt')
      .exec();
  }

  async checkTag(key: string): Promise<Tag | null> {
    return await this.tagModel
      .findOne({
        name: key,
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
