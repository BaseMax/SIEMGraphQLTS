import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountSecurityEvents {
  @Field(() => Int)
  count: number;
}
