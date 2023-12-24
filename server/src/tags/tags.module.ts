import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './database/schema/tag.schema';
import { TagRepository } from './database/repository/tag.repository';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagRepository],
  exports: [TagsService, TagRepository],
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
})
export class TagsModule {}
