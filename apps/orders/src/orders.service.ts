import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingclient: ClientProxy,
  ) {}
  // getHello(): string {
  //   return 'Hello World!';
  // }

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingclient.emit('order_created', { request }),
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
    // return this.ordersRepository.create(request);
  }

  async getOrder() {
    return this.ordersRepository.find({});
  }
}
