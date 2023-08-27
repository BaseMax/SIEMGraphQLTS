import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAlertInput {
  @Field()
  acknowledged: boolean;

  @Field()
  dismissed: boolean;

  @Field()
  id: string;
}
