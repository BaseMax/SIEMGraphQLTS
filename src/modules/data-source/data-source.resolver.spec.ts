import { Test, TestingModule } from '@nestjs/testing';
import { DataSourceResolver } from './data-source.resolver';
import { DataSourceService } from './data-source.service';

describe('DataSourceResolver', () => {
  let resolver: DataSourceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSourceResolver, DataSourceService],
    }).compile();

    resolver = module.get<DataSourceResolver>(DataSourceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
