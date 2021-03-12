import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { UserModel } from './user.model';
import { BlogModel } from '@blurg/src/blog/models/blog.model';

@ObjectType()
@Entity({ name: 'profile' })
export class ProfileModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Field(() => String)
  @Column({ name: 'firstName', nullable: false, type: 'text' })
  firstName: string;

  @Field(() => String)
  @Column({ name: 'lastName', nullable: false, type: 'text' })
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'phone_number', nullable: true, type: 'text' })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'image', nullable: true })
  image: string;

  @Field(() => Boolean)
  @Column({ name: 'is_active', default: true })
  active: boolean;

  @Field({ nullable: false })
  @CreateDateColumn({ name: 'created_date' })
  @Type(() => Date)
  createdDate?: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({ name: 'updated_date' })
  @Type(() => Date)
  updatedDate?: Date;

  @Field({ nullable: false })
  @DeleteDateColumn({ name: 'deleted_date' })
  @Type(() => Date)
  deletedDate?: Date;

  @Field(() => UserModel)
  @OneToOne(() => UserModel, (user) => user.profile, {
    eager: true,
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserModel;

  @Field(() => BlogModel)
  @OneToMany(() => BlogModel, (blogs) => blogs.profile, {
    nullable: false,
  })
  @JoinColumn()
  blogs: BlogModel[];

  constructor(profile: Partial<ProfileModel>) {
    Object.assign(this, profile);
  }
}
