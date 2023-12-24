import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost, SearchPosts, UpdatePost } from './dto/post.request';
import { CurrentUser, CurrentUserType } from '@app/common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@CurrentUser() user: CurrentUserType, @Body() createPost: CreatePost) {
    return this.postsService.create(user.userID, createPost);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePost: UpdatePost) {
    return this.postsService.update(id, updatePost);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUserType) {
    return this.postsService.findAll(user.userID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @Get('search')
  getPosts(
    @Query(new ValidationPipe({ transform: true })) queryParams: SearchPosts,
  ) {
    return this.postsService.searchPosts(queryParams);
  }
}
