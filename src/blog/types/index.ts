import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { BlogType } from '../enums';
import { BlogModel } from '../models/blog.model';

@InputType()
export class SaveBlogInput {
  @Field(() => String, { nullable: true })
  @IsUUID('4')
  @IsOptional()
  id: string;

  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => BlogType, { nullable: true })
  blogType: BlogType;

  @Field(() => Date, { nullable: true })
  publishedDate: Date;

  @Field(() => String, { nullable: true })
  categoryName: string;
}

@InputType()
export class DeleteBlogInput {
  @Field(() => String, { nullable: true })
  @IsUUID('4')
  id: string;
}

@InputType()
export class BlogFilterInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  skip?: number;

  @Field(() => Int, { nullable: true, defaultValue: 50 })
  @IsOptional()
  take?: number;

  @Field(() => String, { nullable: true })
  category?: string;
}

@ObjectType()
export class BlogResponse {
  constructor(blogs: BlogModel[], totalCount: number) {
    this.list = blogs;
    this.totalCount = totalCount;
  }

  @Field(() => Int)
  totalCount: number;

  @Field(() => [BlogModel])
  list: BlogModel[];
}
