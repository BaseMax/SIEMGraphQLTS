import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DataSource {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  description: string;
}
