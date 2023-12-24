import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePost {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(5)
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @Length(1, 300)
  description: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 2000)
  content: string;

  constructor(private assign: Partial<CreatePost>) {
    Object.assign(this, assign);
  }
}

export class UpdatePost {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(5)
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @Length(1, 300)
  description: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 2000)
  content: string;

  constructor(private assign: Partial<CreatePost>) {
    Object.assign(this, assign);
  }
}

export class SearchPosts {
  @IsString()
  @IsOptional()
  @Length(1, 100)
  @Transform(({ value }) => value.toLowerCase())
  title!: string;

  @ToArray()
  @IsArray()
  @IsOptional()
  tags!: string[];

  @IsArray()
  @IsOptional()
  authorID!: string;

  constructor(private assign: Partial<SearchPosts>) {
    Object.assign(this, assign);
  }
}

function ToArray() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((item: string) => item.trim());
    }
    return value;
  });
}
