import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { HashService } from '../src/modules/auth/services/hash.service';
import { Role } from '../src/common/types/role.enum';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  beforeAll(async () => {
    await prisma.user.deleteMany({});

    const hashedPassword = await HashService.hash('12345678');
    await prisma.user.create({
      data: {
        email: 'test@gmail.com',
        username: 'test',
        password: hashedPassword,
        role: Role.Analyst,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});

    await app.close();
  });

  describe('login', () => {
    it('Successful user login with valid credentials', async () => {
      const input = {
        username: 'test',
        password: '12345678',
      };

      const mutation = `mutation {
            login(loginInput: {
                username: "${input.username}",
                password: "${input.password}"
            }) {
                access_token
            }
        }`;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      expect(response.status).toBe(200);

      const { data } = response.body;
      expect(data).not.toBeNull();
      expect(data.login.access_token).toBeDefined();
    });

    it('Login failed with wrong or nonexistent username', async () => {
      const input = {
        username: 'notValidUsername',
        password: 'awed222',
      };

      const mutation = `mutation {
            login(loginInput: {
                username: "${input.username}"
                password: "${input.password}"
            }) {
                access_token
            }
        }`;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeNull();
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    });

    it('Login failed with wrong password', async () => {
      const input = {
        username: 'test',
        password: '12345678!',
      };

      const mutation = `mutation {
        login(loginInput: {
          username: "${input.username}",
          password: "${input.password}"
        }) {
          access_token
        }
      }`;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeNull();
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    });

    it('When you send an empty username', async () => {
      // Arrange
      const input = {
        username: '',
        password: '12345678',
      };

      const mutation = `mutation {
        login(loginInput: {
          username: "${input.username}",
          password: "${input.password}"
        }) {
          access_token
        }
      }`;

      // Act
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.data).toBeNull();
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    });
  });
});
