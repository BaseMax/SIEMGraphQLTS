import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Alert {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
