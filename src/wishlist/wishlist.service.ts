import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async addToWishList(product: any, user: any) {
    return await this.prisma.wishlist.create({
      data: {
        product: {
          connect: {
            id: product.id,
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

  async cleanWishList(user: any) {
    return await this.prisma.wishlist.deleteMany({
      where: { userId: user.id },
    });
  }

  async getWishList(user: any) {
    return await this.prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: true,
      },
    });
  }
}
