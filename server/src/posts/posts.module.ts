import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from './database/repository/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './database/schema/post.schema';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostsService, PostRepository],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    forwardRef(() => ContactModule),
  ],
})
export class PostsModule {}
