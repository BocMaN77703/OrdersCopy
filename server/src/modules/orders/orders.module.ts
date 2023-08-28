import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseService } from '../database/database.service';
import { BullModule } from '@nestjs/bull';
import { OrdersConsumer } from './consumers/orders.consumer';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth/auth.service';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'ordersQueue',
    }),
  ],
  providers: [OrdersService, DatabaseService,OrdersConsumer,JwtService,CartService,AuthService], 
  controllers: [OrdersController],
})
export class OrdersModule {}
