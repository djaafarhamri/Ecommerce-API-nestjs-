import {
  Controller,
  UseGuards,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post()
  addToWishList(@Body() product: any, @Req() req: any) {
    return this.wishlistService.addToWishList(product, req.user);
  }

  @Delete(':id')
  removeFromWishList(@Param('id') id: number) {
    return this.wishlistService.removeFromWishList(id);
  }

  @Delete()
  cleanWishList(@Req() req: any) {
    return this.wishlistService.cleanWishList(req.user);
  }

  @Get()
  getWishList(@Req() req: any) {
    return this.wishlistService.getWishList(req.user);
  }
}
