import { Injectable, UseGuards } from '@nestjs/common';
import { AdminGuard, JwtGuard } from 'src/auth/guard';
import { UserFromReq } from 'src/dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewOrderCartDto } from './dtos';
import { NewOrderItemDto } from './dtos';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async newOrder(user: UserFromReq, cart: NewOrderCartDto) {
    // variant quantity - cart quantity
    cart.items.forEach(async (item: NewOrderItemDto) => {
      const variant = await this.prisma.variant.findUnique({
        where: { id: item.variant.id },
        include: { product: true },
      });
      if (variant.quantity < item.quantity) {
        throw new Error(
          `${item.variant.product.name} Not enough ${item.variant.name} in stock`,
        );
      }
      await this.prisma.variant.update({
        where: { id: item.variant.id },
        data: { quantity: variant.quantity - item.quantity },
      });
    });
    await this.prisma.order.create({
      data: {
        user: { connect: { id: user.id } },
        items: {
          create: cart.items.map((item: NewOrderItemDto) => ({
            variant: { connect: { id: item.variant.id } },
            quantity: item.quantity,
          })),
        },
        total: cart.items.reduce(
          (acc: number, item: NewOrderItemDto) =>
            acc + item.variant.product.price * item.quantity,
          0,
        ),
      },
    });

    return { message: 'Order created' };
  }

  @UseGuards(JwtGuard, AdminGuard)
  async getOrders() {
    return await this.prisma.order.findMany({
      include: { items: { include: { variant: true } } },
    });
  }

  @UseGuards(JwtGuard, AdminGuard)
  async getOrdersByUser(user: UserFromReq) {
    return await this.prisma.order.findMany({
      where: { user: { id: user.id } },
      include: { items: { include: { variant: true } } },
    });
  }

  @UseGuards(JwtGuard, AdminGuard)
  async getOrder(id: number) {
    return await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { variant: true } } },
    });
  }

  @UseGuards(JwtGuard, AdminGuard)
  async deleteOrder(id: number) {
    return await this.prisma.order.delete({ where: { id } });
  }
}
