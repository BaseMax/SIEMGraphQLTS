import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_URL,
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
