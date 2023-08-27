import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

@Resolver(() => Alert)
export class AlertsResolver {
  private pubSub: RedisPubSub;
  private options = {
    host: '127.0.0.1',
    port: 6379,
    retryStrategy: (times: number) => {
      // reconnect after
      return Math.min(times * 50, 2000);
    },
  };

  constructor(private readonly alertsService: AlertsService) {
    this.pubSub = new RedisPubSub({
      publisher: new Redis(this.options),
      subscriber: new Redis(this.options),
    });
  }

  @Subscription(() => Alert)
  newSecurityAlert() {
    return this.pubSub.asyncIterator('newAlert');
  }

  @Mutation(() => Alert)
  async createAlert(
    @Args('createAlertInput') createAlertInput: CreateAlertInput,
  ) {
    const alert = await this.alertsService.create(createAlertInput);
    this.pubSub.publish('newAlert', { newAlert: alert });

    return alert;
  }

  @Query(() => [Alert], { name: 'alerts' })
  findAll() {
    return this.alertsService.findAll();
  }

  @Query(() => Alert, { name: 'alert' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.alertsService.findOne(id);
  }

  @Mutation(() => Alert)
  removeAlert(@Args('id', { type: () => Int }) id: number) {
    return this.alertsService.remove(id);
  }
}
