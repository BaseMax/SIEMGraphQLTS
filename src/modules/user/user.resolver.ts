import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '../../common/types/role.enum';
import { AssignRoleUserInput } from './dto/assign-role.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, {
    description: 'Acknowledge and Dismiss all alerts for a specific user',
  })
  enableOrDisableAlertsUser(
    @Args('id') id: number,
    @Args('receive') receive: boolean,
  ) {
    return this.userService.enableOrDisableAlertsUser(id, receive);
  }

  @Roles(Role.Admin)
  @Mutation(() => User, {
    description: 'Revoke a role from a user',
  })
  revokeRole(@Args('id', { type: () => Int }) id: number) {
    return this.userService.revokeRole(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => User)
  assignRoleUser(
    @Args('assignRoleUserInput') assignRoleUserInput: AssignRoleUserInput,
  ) {
    return this.userService.assignRoleUser(assignRoleUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
