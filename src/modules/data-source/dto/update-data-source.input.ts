import { CreateDataSourceInput } from './create-data-source.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDataSourceInput extends PartialType(CreateDataSourceInput) {
  @Field(() => Int)
  id: number;
}
