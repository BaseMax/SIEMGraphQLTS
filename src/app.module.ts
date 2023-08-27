import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SecurityEventsModule } from './modules/security-events/security-events.module';
import { SearchModule } from './modules/search/search.module';
import { RulesModule } from './modules/rules/rules.module';
import { DataSourceModule } from './modules/data-source/data-source.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { MailModule } from './modules/mail/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserGroupModule } from './modules/user-group/user-group.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
          onConnect: (headersRaw: Record<string, unknown>) => {
            // Lowercase each header key
            const headers = Object.keys(headersRaw).reduce((dest, key) => {
              dest[key.toLowerCase()] = headersRaw[key];
              return dest;
            }, {});
            return {
              req: {
                headers: headers,
              },
            };
          },
        },
      },
    }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    SecurityEventsModule,
    SearchModule,
    RulesModule,
    DataSourceModule,
    AlertsModule,
    MailModule,
    UserGroupModule,
  ],
})
export class AppModule {}
