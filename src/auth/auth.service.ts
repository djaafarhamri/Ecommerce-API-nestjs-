import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(newUserData: AuthDto) {
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
    return newUser;
  }

  signin() {
    return 'signin';
  }
}
