import { Field, InputType } from '@nestjs/graphql';
import { Severity } from '../types/severity.enum';

@InputType()
export class CreateSecurityEventInput {
  @Field()
  dataSource: string;

  @Field()
  destinationIP: string;

  @Field()
  eventType: string;

  @Field()
  message: string;

  @Field(() => Severity)
  severity: Severity;

  @Field()
  sourceIP: string;

  @Field({ nullable: true })
  timestamp: string;

  @Field()
  user: string;
}
