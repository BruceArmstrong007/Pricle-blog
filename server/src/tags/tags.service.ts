import { TagRepository } from './database/repository/tag.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {

  constructor(private readonly tagRepository: TagRepository) {}

  create(name: string) {
    return this.tagRepository.createTag(name);
  }

  getTags(key: string) {
    return this.tagRepository.getTags(key.trim().toLocaleLowerCase());
  }

  checkTag(key: string) {
    return this.tagRepository.checkTag(key);
  }
}
