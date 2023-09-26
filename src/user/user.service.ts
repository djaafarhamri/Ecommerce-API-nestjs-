import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  me(req: any) {
    return this.prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        address: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  update(req: any, updateUserInfo: any) {
    return this.prisma.user.update({
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
