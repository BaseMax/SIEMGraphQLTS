import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { HashService } from '../src/modules/auth/services/hash.service';
import { Role } from '../src/common/types/role.enum';
import { AuthService } from '../src/modules/auth/services/auth.service';

describe('Rule (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let authService: AuthService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    authService = app.get(AuthService);
    await app.init();
  });

  beforeAll(async () => {
    await prisma.user.deleteMany({});

    const hashedPassword = await HashService.hash('12345678');
    const user = await prisma.user.create({
      data: {
        email: 'test@gmail.com',
        username: 'test',
        password: hashedPassword,
        role: Role.Admin,
      },
    });

    token = authService.getToken({ id: user.id, role: user.role });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});

    await app.close();
  });

  describe('create rule', () => {
    it('successful create rule with admin role', async () => {
      // Arrange
      const input = {
        condition: 'test',
        name: 'testRule',
        actions: 'test',
        description: 'ddd',
      };

      const mutation = `mutation {
        createRule(createRuleInput:{
          condition: "${input.condition}"
          name: "${input.name}"
          actions:"${input.actions}"
          description: "${input.description}"
        }) {
          id
          name
          description
        }
      }`;

      // Act
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .set({ Authorization: `Bearer ${token}` })
        .send({ query: mutation });

      // Assert
      expect(response.status).toBe(200);

      const { data } = response.body;
      expect(data.createRule.name).toBe(input.name);
    });

    it('fail response for not login user', async () => {
      // Arrange
      const input = {
        condition: 'test',
        name: 'testRule',
        actions: 'test',
        description: 'ddd',
      };

      const mutation = `mutation {
          createRule(createRuleInput:{
            condition: "${input.condition}"
            name: "${input.name}"
            actions:"${input.actions}"
            description: "${input.description}"
          }) {
            id
            name
            description
          }
        }`;

      // Act
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      // Assert
      expect(response.status).toBe(200);

      expect(response.status).toBe(200);

      const { errors } = response.body;
      expect(errors[0].extensions.code).toBe('UNAUTHENTICATED');
      expect(errors[0].extensions.originalError.statusCode).toBe(401);
    });
  });
});
