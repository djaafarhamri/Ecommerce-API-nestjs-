import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(req: any) {
    return await this.prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        address: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async update(req: any, updateUserInfo: any) {
    return await this.prisma.user.update({
      where: {
        id: req.user.id,
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
