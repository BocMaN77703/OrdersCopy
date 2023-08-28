import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { orderDto } from './dto/order.dto';
import { privateDecrypt } from 'crypto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class OrdersService {
  constructor(
    private readonly db: DatabaseService,
    @InjectQueue('ordersQueue') private readonly ordersQueue: Queue,
  ) {}

  createOrder = async (cartId: number, order: orderDto) => {
    //getting all products in cart
    const cartsProductsPromises = await this.db.carts_products.findMany({
      where: {
        cart_id: cartId,
      },
    });
    const cartsProducts = await Promise.all(cartsProductsPromises);
 
    //deleting products from cart
    await this.db.carts_products.deleteMany({
      where:{cart_id:cartId}
    })

    //creating order
    const created = await this.db.orders.create({
      data: {

        ...order,
        created_at:new Date(),
        status: 'initialized',
      },
    });

    //adding products to order
    cartsProducts.map(async (el) => {
      const productOrder = await this.db.orders_products.create({
        data: {
          order_id: created.id,
          product_id: el.product_id,
          count: el.count,
        },
      });
    });
  };

  confirmOrder = async (orderId: number) => {
    const order = await this.db.orders.update({
      data: { status: 'in processing' }, 
      where: { id: orderId },
    });
    const job = await this.ordersQueue.add({data:order},{delay:600000,removeOnComplete:true})
  };

  getInitializedOrders = async () => {
    const orders = await this.db.orders.findMany({
      where:{
        status:'initialized'
      }
    })

    return orders
  }

  getConfirmedOrders = async () => {
    const statuses = ['in processing','processed']
    const orders = await this.db.orders.findMany({
      where:{
        status:{in:statuses}
      }
    })
    return orders
  }
}
