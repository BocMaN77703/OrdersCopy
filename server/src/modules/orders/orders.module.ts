import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { DatabaseService } from '../database/database.service'
import { BullModule } from '@nestjs/bull'
import { OrdersConsumer } from './consumers/orders.consumer'
import { JwtService } from '@nestjs/jwt'
import { CartService } from '../cart/cart.service'
import { AuthService } from '../auth/auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get('redis_host'),
                    port: configService.get('redis_port'),
                    // username:configService.get('redis_user'),
                    // password:configService.get('redis_password'),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: 'ordersQueue',
        }),
    ],
    providers: [
        OrdersService,
        DatabaseService,
        OrdersConsumer,
        JwtService,
        CartService,
        AuthService,
    ],
    controllers: [OrdersController],
})
export class OrdersModule {}
