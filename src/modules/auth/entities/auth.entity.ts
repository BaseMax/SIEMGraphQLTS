import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  access_token: string;
}
