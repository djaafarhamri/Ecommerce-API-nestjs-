import {
  Controller,
  Put,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Put('add-to-cart/:variantId/:quantity')
  async addToCart(
    @Req() req: any,
    @Param('variantId') variantId: number,
    @Param('quantity') quantity: number,
  ) {
    return await this.cartService.addToCart(req.user, variantId, quantity);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getCart(@Req() req: any) {
    return await this.cartService.getCart(req.user);
  }

  @UseGuards(JwtGuard)
  @Delete('remove-from-cart/:cartItemId')
  async removeFromCart(@Param('cartItemId') cartItemId: number) {
    return await this.cartService.removeFromCart(cartItemId);
  }

  @UseGuards(JwtGuard)
  @Delete('clear-cart')
  async clearCart(@Req() req: any) {
    return await this.cartService.clearCart(req.user);
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
