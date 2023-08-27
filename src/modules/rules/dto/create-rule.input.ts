import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRuleInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  condition: string;

  @Field(() => String)
  actions: string;
}
