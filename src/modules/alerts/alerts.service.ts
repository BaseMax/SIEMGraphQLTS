import { Injectable } from '@nestjs/common';
import { CreateAlertInput } from './dto/create-alert.input';
import { PrismaService } from '../prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from '../mail/mail.service';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@prisma/client';

@Injectable()
export class AlertsService {
  private pubSub: PubSub;
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {
    this.pubSub = new PubSub({});
  }

  @OnEvent('event.created', { async: true })
  async create(payload: CreateAlertInput) {
    await this.prisma.alert.create({
      data: {
        acknowledged: payload.acknowledged,
        dismissed: payload.dismissed,
        eventId: payload?.id,
      },
    });

    const mails = await this.prisma.user.findMany({
      where: { receiveAlerts: true },
      select: { email: true },
    });

    mails.forEach(async (to: User) => {
      const payloadString = JSON.stringify(payload);
      await this.mailService.send(to.email, payloadString);
    });
  }

  findAll() {
    return this.prisma.alert.findMany({});
  }

  findOne(id: number) {
    return this.prisma.alert.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.alert.delete({ where: { id } });
  }
}
