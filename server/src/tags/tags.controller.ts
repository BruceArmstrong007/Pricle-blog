import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CheckTag, CreateTag, SearchTags } from './dto/tag.request';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiExceptionFilter } from '@app/common';

@Controller('tags')
@UseGuards(JwtAuthGuard)
@UseFilters(new ApiExceptionFilter())
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTag) {
    return this.tagsService.create(createTagDto.name);
  }

  @Get('search')
  findTags(@Query() queryParams: SearchTags) {
    return this.tagsService.getTags(queryParams.key);
  }

  
  @Get()
  findTag(@Query() queryParams: CheckTag) {
    return this.tagsService.checkTag(queryParams.key);
  }
}
