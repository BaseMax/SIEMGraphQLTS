import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(to: string, payload: any) {
    return this.mailerService.sendMail({
      to,
      from: 'dd',
      subject: 'ss',
      text: '..',
    });
  }
}
