import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsUUID, IsEmail } from 'class-validator';
import { ProfileModel } from './profile.model';
import { Type } from 'class-transformer';
import { UserType } from 'src/shared/enums/user-type.enum';

registerEnumType(UserType, {
  name: 'UserType',
  description: 'List of roles in the system',
});

@ObjectType()
@Entity({ name: 'users' })
export class UserModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @IsEmail()
  @Field(() => String)
  @Column({ name: 'email', nullable: false, unique: true, type: 'text' })
  email: string;

  @Column({ name: 'password', type: 'character varying', nullable: false })
  password: string;

  @Field(() => String) // mask the possible user types we have in the system
  @Column({ name: 'role', type: 'text', nullable: false })
  role: UserType;

  @Field({ nullable: false })
  @CreateDateColumn({ name: 'created_date' })
  @Type(() => Date)
  createdDate?: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({ name: 'updated_date' })
  @Type(() => Date)
  updatedDate?: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ name: 'deleted_date' })
  @Type(() => Date)
  deletedDate?: Date;

  @Field(() => ProfileModel)
  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    onDelete: 'CASCADE',
  })
  profile: ProfileModel;

  constructor(user: Partial<UserModel>) {
    Object.assign(this, user);
  }
}
