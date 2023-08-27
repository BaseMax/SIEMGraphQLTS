import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Rule {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  condition: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  actions: string;

  @Field(() => String)
  description: string;
}
