import { Body, Controller, Param, ParseIntPipe, Post,Get,UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { orderDto } from './dto/order.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('createOrder/:cartId')
  async createOrder(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() order: orderDto,
  ) {
    const res = await this.ordersService.createOrder(cartId, order);
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('confirmOrder/:orderId')
  async confirmOrder( 
    @Param('orderId', ParseIntPipe) orderId: number,
  ) { 
    const res = await this.ordersService.confirmOrder(orderId);
    return res;
  } 

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('getInitializedOrders')
  async getInitializedOrders(){
    const res = await this.ordersService.getInitializedOrders()
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles('admin') 
  @Get('getConfirmedOrders')
  async getConfirmedOrders(){
    const res = await this.ordersService.getConfirmedOrders() 
    return res;
  }
}
