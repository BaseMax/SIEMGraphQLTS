import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupResolver } from './user-group.resolver';

@Module({
  providers: [UserGroupResolver, UserGroupService]
})
export class UserGroupModule {}
