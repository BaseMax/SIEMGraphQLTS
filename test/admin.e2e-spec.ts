import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { HashService } from '../src/modules/auth/services/hash.service';
import { AuthService } from '../src/modules/auth/services/auth.service';

describe('Admin Actions (e2e)', () => {
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
        email: 'admin2@gmail.com',
        username: 'admin2',
        password: hashedPassword,
        role: 'admin',
      },
    });

    token = authService.getToken({ id: user.id, role: user.role });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});

    await app.close();
  });

  describe('assign role user input', () => {
    it('successful assign role with admin role', async () => {
      // Arrange
      const user = await prisma.user.create({
        data: {
          email: 'ss@gail.com',
          username: 'testuser2',
          password: 'awsaswsa',
          role: 'auditor',
        },
      });

      const mutation = `mutation {
        assignRoleUser(assignRoleUserInput: {
          userId: ${user.id}
          role: Analyst
        }) {
          role
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
      expect(data.assignRoleUser.role).toBe('Analyst');
    });

    it('fail if user not login', async () => {
      // Arrange
      const user = await prisma.user.create({
        data: {
          email: 'sss@gail.com',
          username: 'tesstuser2',
          password: 'awsaswsa',
          role: 'auditor',
        },
      });

      const mutation = `mutation {
        assignRoleUser(assignRoleUserInput: {
          userId: ${user.id}
          role: Analyst
        }) {
          role
        }
      }`;

      // Act
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation });

      // Assert
      expect(response.status).toBe(200);

      const { errors } = response.body;
      expect(errors[0].extensions.code).toBe('UNAUTHENTICATED');
      expect(errors[0].extensions.originalError.statusCode).toBe(401);
    });
  });
});
