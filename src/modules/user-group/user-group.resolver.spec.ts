import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupResolver } from './user-group.resolver';
import { UserGroupService } from './user-group.service';

describe('UserGroupResolver', () => {
  let resolver: UserGroupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupResolver, UserGroupService],
    }).compile();

    resolver = module.get<UserGroupResolver>(UserGroupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
