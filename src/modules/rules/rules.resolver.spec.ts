import { Test, TestingModule } from '@nestjs/testing';
import { RulesResolver } from './rules.resolver';
import { RulesService } from './rules.service';

describe('RulesResolver', () => {
  let resolver: RulesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulesResolver, RulesService],
    }).compile();

    resolver = module.get<RulesResolver>(RulesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
