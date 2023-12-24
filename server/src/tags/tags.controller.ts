import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, GetTags } from './dto/tag.request';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto.name);
  }

  @Get()
  findTags(@Query() queryParams: GetTags) {
    return this.tagsService.getTags(queryParams.key);
  }
}
