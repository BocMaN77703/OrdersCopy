import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [CartService,DatabaseService],
  controllers: [CartController]
})
export class CartModule {}
 