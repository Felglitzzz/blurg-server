import { Field, InputType } from '@nestjs/graphql';

import { IsEmail } from 'class-validator';

@InputType()
export class UserRegistrationInput {
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  password: string;
}
