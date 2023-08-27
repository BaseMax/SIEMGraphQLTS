import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Severity } from '../types/severity.enum';

@ObjectType()
export class SecurityEvent {
  @Field(() => String, { name: 'id', nullable: true })
  _id: string;

  @Field(() => String)
  dataSource: string;

  @Field(() => String)
  destinationIP: string;

  @Field(() => String)
  eventType: string;

  @Field(() => String)
  message: string;

  @Field(() => Severity)
  severity: Severity;

  @Field(() => String)
  sourceIP: string;

  @Field(() => String)
  timestamp: string;

  @Field(() => String)
  user: string;
}

registerEnumType(Severity, { name: 'Severity' });
