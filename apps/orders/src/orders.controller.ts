import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  // @Get()
  // getHello(): string {
  //   return this.ordersService.getHello();
  //   //hello
  // }

  @Post()
  // @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request);
  }

  @Get()
  async getOrder() {
    return this.ordersService.getOrder();
  }
}
