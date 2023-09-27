import { Controller, Delete, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { NewOrderCartDto } from './dtos/newOrderCart.dto';
import { GetUser } from 'src/auth/decorators';
import { UserFromReq } from 'src/dtos';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async newOrder(@GetUser() user: UserFromReq, cart: NewOrderCartDto) {
    return await this.orderService.newOrder(user, cart);
  }

  @Get()
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get('user')
  async getOrdersByUser(@GetUser() user: UserFromReq) {
    return await this.orderService.getOrdersByUser(user);
  }

  @Get(':id')
  async getOrder(id: number) {
    return await this.orderService.getOrder(id);
  }

  @Delete(':id')
  async deleteOrder(id: number) {
    return await this.orderService.deleteOrder(id);
  }
}
