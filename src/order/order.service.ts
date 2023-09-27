import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async newOrder(user: any, cart: any) {
    // variant quantity - cart quantity
    cart.items.forEach(async (item: any) => {
      const variant = await this.prisma.variant.findUnique({
        where: { id: item.variant.id },
        include: { product: true },
      });
      if (variant.quantity < item.quantity) {
        throw new Error(
          `${item.product.name} Not enough ${item.name} in stock`,
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
          create: cart.map((item: any) => ({
            variant: { connect: { id: item.variant.id } },
            quantity: item.quantity,
          })),
        },
        total: cart.reduce(
          (acc: number, item: any) => acc + item.variant.price * item.quantity,
          0,
        ),
      },
    });

    return { message: 'Order created' };
  }

  async getOrders() {
    return await this.prisma.order.findMany({
      include: { items: { include: { variant: true } } },
    });
  }

  async getOrdersByUser(user: any) {
    return await this.prisma.order.findMany({
      where: { user: { id: user.id } },
      include: { items: { include: { variant: true } } },
    });
  }

  async getOrder(id: number) {
    return await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { variant: true } } },
    });
  }

  async deleteOrder(id: number) {
    return await this.prisma.order.delete({ where: { id } });
  }
}
