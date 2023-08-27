import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserGroupInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  userId: number;

  @Field(() => [String])
  permissions: string[];
}
