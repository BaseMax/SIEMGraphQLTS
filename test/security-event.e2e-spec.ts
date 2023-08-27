import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Severity } from '../src/modules/security-events/types/severity.enum';
import { AuthService } from '../src/modules/auth/services/auth.service';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('Security Events (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let authService: AuthService;
  let prisma: PrismaClient;
  let elastic: ElasticsearchService;
  const index = 'security-events';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    elastic = app.get(ElasticsearchService);
    prisma = app.get(PrismaService);
    authService = app.get(AuthService);

    await app.init();
  });

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        username: 'testpo',
        email: 'test@outlook.com',
        password: '1235678',
        role: 'admin',
      },
    });

    token = authService.getToken({ id: user.id, role: user.role });

    const event = {
      dataSource: 'API',
      destinationIP: '198.65.35.96',
      eventType: 'Login',
      message: 'most requests for login in 60s',
      severity: Severity.Medium,
      sourceIP: '55.62.13.5',
      timestamp: new Date().toISOString(),
      user: 'testes',
    };

    await elastic.index({
      index,
      body: {
        ...event,
      },
    });

    const newEvent = event;
    newEvent.sourceIP = '152.168.25.4';
    newEvent.severity = Severity.High;
    newEvent.message = 'most requests for login in 10s';

    await elastic.index({
      index,
      body: {
        ...newEvent,
      },
    });
  });

  afterAll(async () => {
    await elastic.deleteByQuery({
      index,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    await app.close();
  });

  describe('queries', () => {
    describe('get All Security Events', () => {
      it('The user request is logged in and received successfully', async () => {
        // Arrange
        const query = `query {
          getAllSecurityEvents {
            dataSource
            destinationIP
            eventType
            message
            severity
            sourceIP
            timestamp
            user
          }
        }`;

        // Act
        const response = await request(app.getHttpServer())
          .post('/graphql')
          .set({ Authorization: `Bearer ${token}` })
          .send({ query });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data.getAllSecurityEvents)).toBe(
          true,
        );
      });
    });

    describe('get Total Count Security Events', () => {
      it('The user request is logged in and received successfully', async () => {
        // Arrange
        const query = `query {
          getTotalCountSecurityEvents {
            count
          }
        }`;

        // Act
        const response = await request(app.getHttpServer())
          .post('/graphql')
          .set({ Authorization: `Bearer ${token}` })
          .send({ query });

        // Assert
        expect(response.status).toBe(200);

        const { data } = response.body;
        expect(data.getTotalCountSecurityEvents.count).toBeDefined();
      });
    });

    describe('getSecurityEventsByIP', () => {
      it('The user request is logged in and received successfully', async () => {
        // Arrange
        const ip = '55.62.13.5';
        const query = `query {
          getSecurityEventsByIP(ip: "${ip}") {
            dataSource
            destinationIP
            eventType
            message
            severity
            sourceIP
            timestamp
            user
          }
        }`;

        // Act
        const response = await request(app.getHttpServer())
          .post('/graphql')
          .set({ Authorization: `Bearer ${token}` })
          .send({ query });

        // Assert
        expect(response.status).toBe(200);

        const { data } = response.body;
        expect(Array.isArray(data.getSecurityEventsByIP)).toBe(true);
      });
    });
  });
});
