import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserFromReq } from 'src/dtos';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async addToWishList(productId: number, user: UserFromReq) {
    return await this.prisma.wishlist.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async removeFromWishList(id: number) {
    return await this.prisma.wishlist.delete({
      where: { id },
    });
  }

  async cleanWishList(user: UserFromReq) {
    return await this.prisma.wishlist.deleteMany({
      where: { userId: user.id },
    });
  }

  async getWishList(user: UserFromReq) {
    return await this.prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: true,
      },
    });
  }
}
