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

  @Field({ nullable: false })
  @CreateDateColumn({ name: 'created_date' })
  @Type(() => Date)
  createdDate?: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({ name: 'updated_date' })
  @Type(() => Date)
  updatedDate?: Date;

  @Field(() => ProfileModel)
  @ManyToOne(() => ProfileModel, (profile) => profile.blogs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  profile: ProfileModel;

  constructor(blog: Partial<BlogModel>) {
    Object.assign(this, blog);
  }
}
