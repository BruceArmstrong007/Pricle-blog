import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from '../schema/post.schema';
import { SearchPosts, TimelinePosts } from 'src/posts/dto/post.request';

@Injectable()
export class PostRepository {
  protected readonly logger = new Logger(PostRepository.name);

  constructor(@InjectModel(Post.name) public readonly postModel: Model<Post>) {}

  async findAll(userID: string): Promise<Post[] | null> {
    const authorID = new Types.ObjectId(userID);

    return await this.postModel
      .find({
        author: authorID,
      })
      .sort({ created_at: -1 })
      .exec();
  }

  async findOne(_id: string): Promise<Post | null> {
    const postID = new Types.ObjectId(_id);
    return await this.postModel.findById(postID).exec();
  }

  async create(
    userID: string,
    title: string,
    description: string,
    content: string,
    tags: string[],
  ) {
    const authorID = new Types.ObjectId(userID);
    const newTag = new this.postModel({
      title,
      description,
      content,
      tags: tags.map((tag: string) => new Types.ObjectId(tag)),
      author: authorID,
    });
    return await newTag.save();
  }

  async update(
    _id: string,
    title: string,
    description: string,
    content: string,
    tags: any[],
  ) {
    const postID = new Types.ObjectId(_id);
    tags = tags.map((tag: string) => new Types.ObjectId(tag));
    return await this.postModel
      .findByIdAndUpdate(postID, {
        title,
        description,
        content,
        tags,
      })
      .exec();
  }

  async delete(_id: string) {
    const postID = new Types.ObjectId(_id);
    return await this.postModel.findByIdAndDelete(postID).exec();
  }

  async searchPosts(queryParams: SearchPosts): Promise<Post[] | null> {
    let filterQuery = new Object();
    if (queryParams?.authorID) {
      filterQuery = { author: new Types.ObjectId(queryParams.authorID) };
    }
    if (queryParams.tags) {
      filterQuery = { ...filterQuery, tags: queryParams.tags };
    }
    if (queryParams.title) {
      const regex = new RegExp(queryParams.title, 'i');
      filterQuery = { ...filterQuery, title: regex };
    }
    return await this.postModel
      .find(filterQuery)
      .sort({ created_at: -1 })
      .exec();
  }

  async timelinePosts(
    userID: string,
    queryParams: TimelinePosts,
    friendIDs: string[],
  ): Promise<Post[] | null> {
    const skip = (queryParams.page - 1) * queryParams.pageSize;
    const ids = [
      ...friendIDs.map((id) => new Types.ObjectId(id)),
      new Types.ObjectId(userID),
    ];
    return await this.postModel
      .find({
        author: { $in: ids },
      })
      .sort({
        created_at: -1,
      })
      .skip(skip)
      .limit(queryParams.pageSize)
      .populate({
        path: 'author',
        select: '-password -verified', 
      })
      .populate('tags')
      .exec();
  }
}
