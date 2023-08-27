import { Module } from '@nestjs/common';
import { SecurityEventsService } from './security-events.service';
import { SecurityEventsQueriesResolver } from './events-queries.resolver';
import { SearchModule } from '../search/search.module';
import { SecurityEventsMutationsResolver } from './events-mutations.resolver';

@Module({
  imports: [SearchModule],
  providers: [
    SecurityEventsService,
    SecurityEventsQueriesResolver,
    SecurityEventsMutationsResolver,
  ],
})
export class SecurityEventsModule {}
