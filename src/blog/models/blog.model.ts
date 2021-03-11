import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ProfileModel } from '@blurg/src/users/models/profile.model';
import { BlogType } from '../enums';
import { BlogCategoryModel } from './blog-category.model';

registerEnumType(BlogType, {
  name: 'BlogType',
  description: 'Types of blogs',
});

@ObjectType()
@Entity({ name: 'blogs' })
export class BlogModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Field(() => String)
  @Column({ name: 'title', nullable: false, type: 'text' })
  title: string;

  @Field(() => String)
  @Column({ name: 'content', nullable: true, type: 'text' })
  content: string;

  @Field(() => String)
  @Column({ name: 'image', nullable: true, type: 'text' })
  image: string;

  @Field(() => BlogType)
  @Column({
    name: 'blog_type',
    nullable: true,
    type: 'text',
    default: BlogType.Draft,
  })
  blogType: BlogType;

  @Field({ nullable: false })
  @CreateDateColumn({ name: 'created_date' })
  @Type(() => Date)
  createdDate?: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({ name: 'updated_date' })
  @Type(() => Date)
  updatedDate?: Date;

  @Field({ nullable: true })
  @Column({ name: 'published_date', nullable: true, type: 'date' })
  @Type(() => Date)
  publishedDate?: Date;

  @Field(() => ProfileModel)
  @ManyToOne(() => ProfileModel, (profile) => profile.blogs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  profile: ProfileModel;

  @Field(() => BlogCategoryModel)
  @ManyToOne(() => BlogCategoryModel, {
    eager: true,
    cascade: true,
  })
  category: BlogCategoryModel;

  constructor(blog: Partial<BlogModel>) {
    Object.assign(this, blog);
  }
}
