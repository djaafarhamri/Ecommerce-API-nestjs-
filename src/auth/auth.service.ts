import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(newUserData: SignupDto) {
    try {
      // hash the password
      const hashedPassword = await argon.hash(newUserData.password);
      // save the user in the db
      const newUser = await this.prisma.user.create({
        data: {
          ...newUserData,
          password: hashedPassword,
        },
      });
      // send back the token
      return this.signToken(newUser.id, newUser.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw error;
    }
  }

  async signin(signinData: SigninDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: signinData.email,
      },
    });
    // if user not found, throw error
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    // compare password
    const pwMatches = await argon.verify(user.password, signinData.password);
    // if password is incorrect, throw error
    if (!pwMatches) {
      throw new ForbiddenException('Invalid credentials');
    }
    // send back the token
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return { access_token: token };
  }
}
