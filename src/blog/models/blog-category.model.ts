import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ObjectType()
@Entity({ name: 'blog_categories' })
export class BlogCategoryModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Field(() => String)
  @Column({ name: 'name', nullable: false, type: 'text' })
  name: string;

  constructor(blogCategory: Partial<BlogCategoryModel>) {
    Object.assign(this, blogCategory);
  }
}
