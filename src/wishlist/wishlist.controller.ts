import {
  Controller,
  UseGuards,
  Post,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtGuard } from 'src/auth/guard';
import { UserFromReq } from 'src/dtos';
import { GetUser } from 'src/auth/decorators';

@UseGuards(JwtGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post(':id')
  addToWishList(@Param('id') productId: number, @GetUser() user: UserFromReq) {
    return this.wishlistService.addToWishList(productId, user);
  }

  @Delete(':id')
  removeFromWishList(@Param('id') id: number) {
    return this.wishlistService.removeFromWishList(id);
  }

  @Delete()
  cleanWishList(@GetUser() user: UserFromReq) {
    return this.wishlistService.cleanWishList(user);
  }

  @Get()
  getWishList(@GetUser() user: UserFromReq) {
    return this.wishlistService.getWishList(user);
  }
}
