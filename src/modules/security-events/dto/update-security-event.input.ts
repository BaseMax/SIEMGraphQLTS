import { CreateSecurityEventInput } from './create-security-event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSecurityEventInput extends PartialType(
  CreateSecurityEventInput,
) {
  @Field(() => String)
  id: string;
}
