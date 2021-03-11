import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserRegistrationResponse {
  @Field(() => String)
  accessToken: string;
}
