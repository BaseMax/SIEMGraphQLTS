import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { SecurityEvent } from './entities/security-event.entity';
import { CreateSecurityEventInput } from './dto/create-security-event.input';
import { SecurityEventsService } from './security-events.service';
import { UpdateSecurityEventInput } from './dto/update-security-event.input';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

@Resolver()
export class SecurityEventsMutationsResolver {
  private pubsub: RedisPubSub;
  public monitoringSuspended = true;
  private options = {
    host: '127.0.0.1',
    port: 6379,
    retryStrategy: (times: number) => {
      // reconnect after
      return Math.min(times * 50, 2000);
    },
  };

  constructor(
    private readonly securityEventsService: SecurityEventsService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.pubsub = new RedisPubSub({
      publisher: new Redis(this.options),
      subscriber: new Redis(this.options),
    });
  }

  @Subscription(() => SecurityEvent)
  newSecurityEvent() {
    if (this.monitoringSuspended === false) {
      throw new BadRequestException(
        'Monitoring is temporarily disabled for maintenance',
      );
    }
    return this.pubsub.asyncIterator('newSecurityEvent');
  }

  @Mutation(() => SecurityEvent)
  async createSecurityEvent(
    @Args('createSecurityEventInput')
    createSecurityEventInput: CreateSecurityEventInput,
  ) {
    createSecurityEventInput.timestamp = new Date().toISOString();

    const { id, result } = await this.securityEventsService.create(
      createSecurityEventInput,
    );

    if (result === 'created') {
      this.pubsub.publish('newSecurityEvent', {
        newSecurityEvent: { id, ...createSecurityEventInput },
      });

      createSecurityEventInput.id = id;

      this.eventEmitter.emitAsync('event.created', {
        createSecurityEventInput,
      });
    }

    return createSecurityEventInput;
  }

  @Mutation(() => SecurityEvent)
  updateSecurityEvent(
    @Args('updateSecurityEventInput')
    updateSecurityEventInput: UpdateSecurityEventInput,
  ) {
    return this.securityEventsService.update(updateSecurityEventInput);
  }

  @Mutation(() => SecurityEvent)
  async deleteSecurityEvent(@Args('id', { type: () => String }) id: string) {
    return this.securityEventsService.delete(id);
  }

  @Mutation(() => Boolean)
  async suspendRealTimeMonitoring(): Promise<boolean> {
    this.monitoringSuspended = true;
    return true;
  }

  @Mutation(() => Boolean)
  async resumeRealTimeMonitoring(): Promise<boolean> {
    this.monitoringSuspended = false;
    return true;
  }
}
