import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
      // return the saved user
      delete newUser.password;
      return newUser;
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
    // send back the user
    delete user.password;
    return user;
  }
}
