import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.user.findMany();
  }

  update(user: any, updateUserInfo: any) {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...updateUserInfo,
        address: {
          update: updateUserInfo.address,
        },
      },
    });
  }
}
