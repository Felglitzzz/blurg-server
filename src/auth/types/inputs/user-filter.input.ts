import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UserFilterOptions {
  @Field(() => Int, { nullable: true, defaultValue: 50 })
  skip?: number;

  @Field(() => Int, { nullable: true, defaultValue: 50 })
  take?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  password?: string;
}
