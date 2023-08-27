import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { HashService } from '../src/modules/auth/services/hash.service';
import { Role } from '../src/common/types/role.enum';
import { AuthService } from '../src/modules/auth/services/auth.service';

describe('USer (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let authService: AuthService;
  let adminToken: string;
  let analystToken: string;

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
    const admin = await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        username: 'adminUser',
        password: hashedPassword,
        role: Role.Admin,
      },
    });

    adminToken = authService.getToken({ id: admin.id, role: admin.role });

    const analyst = await prisma.user.create({
      data: {
        email: 'analyst@gmail.com',
        username: 'analyst',
        password: hashedPassword,
        role: Role.Analyst,
      },
    });

    analystToken = authService.getToken({ id: analyst.id, role: analyst.role });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});

    await app.close();
  });

  describe('create user', () => {
    it('Successful creation of new user with admin role', async () => {
      // Arrange
      const input = {
        email: 'nancy@gmail.com',
        username: 'nancyUser',
        password: '123456789',
        role: 'Analyst',
      };

      const mutation = `mutation {
            createUser(
                createUserInput: {
                    email: "${input.email}",
                    username: "${input.username}",
                    password: "${input.password}",
                    role: ${input.role},
                }
            ) {
                id
                email
                username
                role
            }
        }`;

      // Act
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({ query: mutation });

      // Assert
      expect(response.status).toBe(200);

      const { data } = response.body;

      expect(data.createUser.email).toBe(input.email);
      expect(data.createUser.username).toBe(input.username);
      expect(data.createUser.role).toBe(input.role);
    });

    it('When the user is logged in but does not have the admin role', async () => {
      // Arrange
      const input = {
        email: 'nancy@gmail.com',
        username: 'nancyUser',
        password: '123456789',
        role: 'Analyst',
      };

      const mutation = `mutation {
                createUser(
                    createUserInput: {
                        email: "${input.email}",
                        username: "${input.username}",
                        password: "${input.password}",
                        role: ${input.role},
                    }
                ) {
                    id
                    email
                    username
                    role
                }
            }`;

      // Act
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .set({ Authorization: `Bearer ${analystToken}` })
        .send({ query: mutation });

      // Assert
      expect(response.status).toBe(200);

      const { errors } = response.body;
      expect(errors[0].extensions.code).toBe('FORBIDDEN');
      expect(errors[0].extensions.originalError.statusCode).toBe(403);
    });

    it('The user is not logged in and is requesting to create user', async () => {
      // Arrange
      const input = {
        email: 'nancy@gmail.com',
        username: 'nancyUser',
        password: '123456789',
        role: 'Analyst',
      };

      const mutation = `mutation {
                createUser(
                    createUserInput: {
                        email: "${input.email}",
                        username: "${input.username}",
                        password: "${input.password}",
                        role: ${input.role},
                    }
                ) {
                    id
                    email
                    username
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
