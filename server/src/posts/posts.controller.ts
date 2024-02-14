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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiExceptionFilter, CurrentUser, CurrentUserType } from '@app/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  CreatePost,
  SearchPosts,
  TimelinePosts,
  UpdatePost,
} from './dto/post.request';

@Controller('posts')
@UseGuards(JwtAuthGuard)
@UseFilters(new ApiExceptionFilter())
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

  @Get('search')
  getPosts(
    @Query(new ValidationPipe({ transform: true })) queryParams: SearchPosts,
  ) {
    return this.postsService.searchPosts(queryParams);
  }

  @Get('timeline')
  timeLinePosts(
    @Query(new ValidationPipe({ transform: true })) queryParams: TimelinePosts,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.postsService.timelinePosts(user.userID, queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
