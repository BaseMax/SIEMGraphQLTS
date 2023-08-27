import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SecurityEventsService } from './security-events.service';
import { SecurityEvent } from './entities/security-event.entity';
import { CountSecurityEvents } from './entities/count.object';
import { Severity } from './types/severity.enum';

@Resolver(() => SecurityEvent)
export class SecurityEventsQueriesResolver {
  constructor(private readonly securityEventsService: SecurityEventsService) {}

  @Query(() => [SecurityEvent])
  getAllSecurityEvents() {
    return this.securityEventsService.findAll();
  }

  @Query(() => [SecurityEvent])
  getSecurityEventById(@Args('id', { type: () => String }) id: string) {
    return this.securityEventsService.findOne(id);
  }

  @Query(() => CountSecurityEvents)
  getTotalCountSecurityEvents() {
    return this.securityEventsService.totalCount();
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsByIP(@Args('ip', { type: () => String }) ip: string) {
    return this.securityEventsService.getBy('sourceIP', ip);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsByEventType(
    @Args('eventType', { type: () => String }) eventType: string,
  ) {
    return this.securityEventsService.getBy('eventType', eventType);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsByDataSource(
    @Args('dataSource', { type: () => String }) dataSource: string,
  ) {
    return this.securityEventsService.getBy('dataSource', dataSource);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsByTimeRange(
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.securityEventsService.getByTimeRange(startDate, endDate);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsByDestinationIP(
    @Args('destinationIP', { type: () => String }) destinationIP: string,
  ) {
    return this.securityEventsService.getBy('destinationIP', destinationIP);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsByUser(@Args('user', { type: () => String }) user: string) {
    return this.securityEventsService.getBy('user', user);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsBySeverity(
    @Args('severity', { type: () => Severity }) severity: Severity,
  ) {
    return this.securityEventsService.getBy('severity', severity);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsByTimestampSorting(
    @Args('sort', { type: () => String }) _sort: 'asc' | 'desc',
  ) {
    return this.securityEventsService.getByTimestampAndSorting(_sort);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsBySeverityAndOrder(
    @Args('severity', { type: () => String }) severity: string,
    @Args('sort', { type: () => String }) _sort: 'asc' | 'desc',
  ) {
    return this.securityEventsService.getBySeverityAndSorting(severity, _sort);
  }

  @Query(() => CountSecurityEvents)
  getSecurityEventsCountBySeverity(
    @Args('severity', { type: () => Severity }) severity: Severity,
  ) {
    return this.securityEventsService.getCountBy('severity', severity);
  }

  @Query(() => CountSecurityEvents)
  getSecurityEventsCountByEventType(
    @Args('eventType', { type: () => String }) eventType: string,
  ) {
    return this.securityEventsService.getCountBy('eventType', eventType);
  }

  @Query(() => CountSecurityEvents)
  getSecurityEventsCountByUser(
    @Args('user', { type: () => String }) user: string,
  ) {
    return this.securityEventsService.getCountBy('user', user);
  }

  @Query(() => CountSecurityEvents)
  getSecurityEventsCountByIP(@Args('ip', { type: () => String }) ip: string) {
    return this.securityEventsService.getCountBy('ip', ip);
  }

  @Query(() => CountSecurityEvents)
  getSecurityEventsCountByTimeRage(
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.securityEventsService.getCountByTimeRange(startDate, endDate);
  }

  @Query(() => [SecurityEvent])
  getSecurityEventsCountByDataSource(
    @Args('dataSource', { type: () => String }) dataSource: string,
  ) {
    return this.securityEventsService.getCountBy('dataSource', dataSource);
  }

  @Query(() => [SecurityEvent], {
    description: 'Get the least common event types in the last 7 days',
  })
  getCommonEventTypesLast7Day(@Args('eventType') eventType: string) {
    return this.securityEventsService.getByEventTypesLast7Days(eventType);
  }

  @Query(() => [SecurityEvent], {
    description:
      'Get security events for a specific data source within a time range',
  })
  getSecurityEventsByDataSourceATimeRange(
    @Args('dataSource', { type: () => String }) dataSource: string,
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.securityEventsService.getByAndTimeRange(
      'dataSource',
      dataSource,
      startDate,
      endDate,
    );
  }

  @Query(() => [SecurityEvent], {
    description:
      'Get security events generated by a specific process or application.',
  })
  getSecurityEventsByApplication(
    @Args('application', { type: () => String }) application: string,
  ) {
    return this.securityEventsService.getBy('dataSource', application);
  }

  @Query(() => [SecurityEvent])
  getCommonAttackTypesIn24H(@Args('limit', { type: () => Int }) limit: number) {
    return this.securityEventsService.getCommonAttacks(limit);
  }

  @Query(() => [SecurityEvent], {
    description: 'Get security events for a specific user within a time range',
  })
  getSecurityEventsByUserATimeRange(
    @Args('user', { type: () => String }) user: string,
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.securityEventsService.getByAndTimeRange(
      'user',
      user,
      startDate,
      endDate,
    );
  }

  @Query(() => [SecurityEvent], {
    description:
      'Get security events that match a specific regular expression pattern.',
  })
  getSecurityEventsByPattern(
    @Args('key', { type: () => String }) key: string,
    @Args('pattern', { type: () => String }) pattern: string,
  ) {
    return this.securityEventsService.getSecurityEventsByPattern(key, pattern);
  }

  @Query(() => [SecurityEvent], {
    description: 'Get security events for a specific user and data source',
  })
  getSecurityEventsByUserAndDataSource(
    @Args('user', { type: () => String }) user: string,
    @Args('dataSource', { type: () => String }) dataSource: string,
  ) {
    return this.securityEventsService.getSecurityEventsByUserAndDataSource(
      user,
      dataSource,
    );
  }
}
