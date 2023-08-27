import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsResolver } from './alerts.resolver';

@Module({
  providers: [AlertsResolver, AlertsService]
})
export class AlertsModule {}
