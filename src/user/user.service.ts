import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { UserFromReq } from 'src/dtos';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(user: UserFromReq) {
    return await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        address: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async update(user: UserFromReq, updateUserInfo: UpdateUserDto) {
    return await this.prisma.user.update({
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
