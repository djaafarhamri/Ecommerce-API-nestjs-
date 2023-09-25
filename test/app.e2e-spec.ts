import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { SigninDto, SignupDto } from '../src/auth/dto';
import cookieParser from 'cookie-parser';
// import { UserDto } from '../src/user/dto';

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
    app.use(cookieParser());

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
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
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send(newUser)
          .expect(400);
      });

      it('should not create a user with invalid password', () => {
        const newUser = { ...user, password: '' };
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send(newUser)
          .expect(400);
      });
      it('should create a user', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send(user)
          .expect(201)
          .expect((res) => {
            expect(res.headers).toHaveProperty('set-cookie');
          });
      });
    });

    describe('POST /auth/signin', () => {
      it('should not signin a user with wrong credentials', () => {
        const user: SigninDto = {
          email: 'testemail2@gmail.com',
          password: 'testpassword2aaa',
        };
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send(user)
          .expect(403);
      });
      it('should signin a user', () => {
        const user: SigninDto = {
          email: 'testemail2@gmail.com',
          password: 'testpassword2',
        };
        const rq = request(app.getHttpServer())
          .post('/auth/signin')
          .send(user)
          .expect(200)
          .expect((res) => {
            console.log('res: ', res);
            expect(res.headers).toHaveProperty('set-cookie');
          });
        console.log('cookies: ', rq);
        return rq;
      });
    });
  });

  describe('User', () => {
    describe('GET /users/me', () => {
      it('should get the authenticated user profile', async () => {
        return request(app.getHttpServer()).get('/users/me').expect(200);
      });
    });
  });
});
