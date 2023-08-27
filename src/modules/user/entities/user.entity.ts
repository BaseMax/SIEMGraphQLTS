import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../../common/types/role.enum';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => Role)
  role: Role;
}
