import { Module } from '@nestjs/common';
import { DataSourceService } from './data-source.service';
import { DataSourceResolver } from './data-source.resolver';

@Module({
  providers: [DataSourceResolver, DataSourceService]
})
export class DataSourceModule {}
