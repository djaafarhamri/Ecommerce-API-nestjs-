import { Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { NewOrderCartDto } from './dtos/newOrderCart.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async newOrder(@Req() req: any, cart: NewOrderCartDto) {
    return await this.orderService.newOrder(req.user, cart);
  }

  @Get()
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get('user')
  async getOrdersByUser(@Req() req: any) {
    return await this.orderService.getOrdersByUser(req.user);
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
