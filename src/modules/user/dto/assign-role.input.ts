import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { Role } from '../../../common/types/role.enum';

@InputType()
export class AssignRoleUserInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Role)
  role: Role;
}

registerEnumType(Role, { name: 'role' });
