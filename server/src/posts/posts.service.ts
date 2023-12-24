import { Injectable } from '@nestjs/common';
import { CreatePost, SearchPosts, UpdatePost } from './dto/post.request';
import { PostRepository } from './database/repository/post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  create(authorID: string, createPost: CreatePost) {
    return this.postRepository.create(
      authorID,
      createPost.title,
      createPost.description,
      createPost.content,
      createPost.tags,
    );
  }

  findAll(authorID: string) {
    return this.postRepository.findAll(authorID);
  }

  findOne(id: string) {
    return this.postRepository.findOne(id);
  }

  update(id: string, updatePost: UpdatePost) {
    return this.postRepository.create(
      id,
      updatePost.title,
      updatePost.description,
      updatePost.content,
      updatePost.tags,
    );
  }

  delete(id: string) {
    return this.postRepository.delete(id);
  }

  searchPosts(queryParams: SearchPosts) {
    return this.postRepository.searchPosts(queryParams);
  }
}
