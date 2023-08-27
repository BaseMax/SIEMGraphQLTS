import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDataSourceInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  description: string;
}
