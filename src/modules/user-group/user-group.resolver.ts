import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserGroupService } from './user-group.service';
import { UserGroup } from './entities/user-group.entity';
import { CreateUserGroupInput } from './dto/create-user-group.input';
import { UpdateUserGroupInput } from './dto/update-user-group.input';

@Resolver(() => UserGroup)
export class UserGroupResolver {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Mutation(() => UserGroup)
  createUserGroup(
    @Args('createUserGroupInput') createUserGroupInput: CreateUserGroupInput,
  ) {
    return this.userGroupService.create(createUserGroupInput);
  }

  @Query(() => [UserGroup], { name: 'userGroup' })
  findAll() {
    return this.userGroupService.findAll();
  }

  @Query(() => UserGroup, { name: 'userGroup' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userGroupService.findOne(id);
  }

  @Mutation(() => UserGroup)
  updateUserGroup(
    @Args('updateUserGroupInput') updateUserGroupInput: UpdateUserGroupInput,
  ) {
    return this.userGroupService.update(
      updateUserGroupInput.id,
      updateUserGroupInput,
    );
  }

  @Mutation(() => UserGroup)
  removeUserGroup(@Args('id', { type: () => Int }) id: number) {
    return this.userGroupService.remove(id);
  }
}
