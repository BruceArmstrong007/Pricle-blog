import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  CreatePost,
  SearchPosts,
  TimelinePosts,
  UpdatePost,
} from './dto/post.request';
import { PostRepository } from './database/repository/post.repository';
import { ContactService } from 'src/contact/contact.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
  ) {}

  async create(authorID: string, createPost: CreatePost) {
    return await this.postRepository.create(
      authorID,
      createPost.title,
      createPost.description,
      createPost.content,
      createPost.tags,
    );
  }

  async findAll(authorID: string) {
    return await this.postRepository.findAll(authorID);
  }

  async findOne(id: string) {
    return await this.postRepository.findOne(id);
  }

  async update(id: string, updatePost: UpdatePost) {
    return await this.postRepository.create(
      id,
      updatePost.title,
      updatePost.description,
      updatePost.content,
      updatePost.tags,
    );
  }

  async delete(id: string) {
    return await this.postRepository.delete(id);
  }

  async searchPosts(queryParams: SearchPosts) {
    return await this.postRepository.searchPosts(queryParams);
  }

  async timelinePosts(userID: string, queryParams: TimelinePosts) {
    console.log(userID, queryParams);

    const friendIDs = (await this.contactService.getContacts(userID)).contacts;
    console.log(friendIDs);

    return await this.postRepository.timelinePosts(
      userID,
      queryParams,
      friendIDs,
    );
  }
}
