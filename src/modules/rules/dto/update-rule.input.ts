import { CreateRuleInput } from './create-rule.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRuleInput extends PartialType(CreateRuleInput) {
  @Field(() => Int)
  id: number;
}
