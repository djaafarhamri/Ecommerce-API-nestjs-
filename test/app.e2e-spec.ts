import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { SigninDto, SignupDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const user: SignupDto = {
      email: 'testemail2@gmail.com',
      password: 'testpassword2',
      firstName: 'testname',
      lastName: 'testname',
      role: 'USER',
    };
    describe('POST /auth/signup', () => {
      it('should not create a user with invalid email', () => {
        const newUser = { ...user, email: 'testemail' };
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(newUser)
          .expectStatus(400)
          .inspect();
      });

      it('should not create a user with invalid password', () => {
        const newUser = { ...user, password: '' };
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(newUser)
          .expectStatus(400)
          .inspect();
      });
      it('should create a user', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(user)
          .expectStatus(201)
          .inspect();
      });
    });

    describe('POST /auth/signin', () => {
      it('should signin a user', () => {
        const user: SigninDto = {
          email: 'testemail2@gmail.com',
          password: 'testpassword2',
        };
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(user)
          .expectStatus(200)
          .inspect();
      });
      it('should not signin a user with wrong credentials', () => {
        const user: SigninDto = {
          email: 'testemail2@gmail.com',
          password: 'testpassword2aaa',
        };
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(user)
          .expectStatus(403)
          .inspect();
      });
    });
  });

  describe('User', () => {
    describe('GET /users/me', () => {});
  });
});
