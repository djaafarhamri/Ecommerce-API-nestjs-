import { Controller, Put, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';
import { UserFromReq } from 'src/dtos';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Put('add-to-cart/:variantId/:quantity')
  async addToCart(
    @GetUser() user: UserFromReq,
    @Param('variantId') variantId: number,
    @Param('quantity') quantity: number,
  ) {
    return await this.cartService.addToCart(user, variantId, quantity);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getCart(@GetUser() user: UserFromReq) {
    return await this.cartService.getCart(user);
  }

  @UseGuards(JwtGuard)
  @Delete('remove-from-cart/:cartItemId')
  async removeFromCart(@Param('cartItemId') cartItemId: number) {
    return await this.cartService.removeFromCart(cartItemId);
  }

  @UseGuards(JwtGuard)
  @Delete('clear-cart')
  async clearCart(@GetUser() user: UserFromReq) {
    return await this.cartService.clearCart(user);
  }

  @UseGuards(JwtGuard)
  @Put('update-cart-item/:cartItemId/:quantity')
  async updateCartItem(
    @Param('cartItemId') cartItemId: number,
    @Param('quantity') quantity: number,
  ) {
    return await this.cartService.updateCartItem(cartItemId, quantity);
  }
}
