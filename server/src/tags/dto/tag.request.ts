import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTag {
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(private assign: Partial<CreateTag>) {
    Object.assign(this, assign);
  }
}

export class SearchTags {
  @IsString()
  @IsNotEmpty()
  key: string;

  constructor(private assign: Partial<SearchTags>) {
    Object.assign(this, assign);
  }
}

export class CheckTag {
  @IsString()
  @IsNotEmpty()
  key: string;

  constructor(private assign: Partial<CheckTag>) {
    Object.assign(this, assign);
  }
}
