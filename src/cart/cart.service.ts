import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(user: any, variantId: number, quantity: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
    });
    const itemAlreadyInCart = cart.items.find(
      (item) => item.variantId === variantId,
    );

    if (itemAlreadyInCart) {
      return await this.prisma.cartItem.update({
        where: {
          id: itemAlreadyInCart.id,
        },
        data: {
          quantity: itemAlreadyInCart.quantity + quantity,
        },
      });
    }

    return await this.prisma.cartItem.create({
      data: {
        quantity,
        variant: {
          connect: {
            id: variantId,
          },
        },
        cart: {
          connect: {
            userId: user.id,
          },
        },
      },
    });
  }

  async getCart(user: any) {
    return await this.prisma.cart.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  async removeFromCart(cartItemId: number) {
    return await this.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }

  async clearCart(user: any) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
    });

    const cartItemIds = cart.items.map((item) => item.id);

    return await this.prisma.cartItem.deleteMany({
      where: {
        id: {
          in: cartItemIds,
        },
      },
    });
  }

  async updateCartItem(cartItemId: number, quantity: number) {
    return await this.prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
  }
}
