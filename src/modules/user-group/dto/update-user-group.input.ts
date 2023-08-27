import { CreateUserGroupInput } from './create-user-group.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserGroupInput extends PartialType(CreateUserGroupInput) {
  @Field(() => Int)
  id: number;
}
