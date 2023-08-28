import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ItemInCartDto } from './dto/itemInCart.dto';
import { product } from '@prisma/client';
import { DeleteItemInCartDto } from './dto/deleteItemInCart.dto';

@Injectable()
export class CartService {
  constructor(private db: DatabaseService) {}

  getCartById = async (id: number) => {
    const cart = await this.db.cart.findUnique({
      where: { id: id },
    });
    return cart;
  };

  createCart = async () => {
    const cart = await this.db.cart.create({});
    return cart;
  };

  getItemsFromCart = async (cartId: number) => {
    const carts_products = await this.db.carts_products.findMany({
      where: {
        cart_id: cartId,
      },
    });
   
    let productsPromises = carts_products.map(async (item) => {
      const product = await this.db.product.findUnique({
        where: { id: item.product_id },
      });
      return {...product,count:item.count}
    });
  
    const products = await Promise.all(productsPromises)
    return products;
  };

  addItemToCart = async (dto: ItemInCartDto) => {
    const isInCart = await this.db.carts_products.findFirst({
      where: {
        cart_id: dto.cartId,
        product_id: dto.itemId,
      },
    });

    if (isInCart) {
        dto.count+=isInCart.count
        return this.updateItemCountInCart(dto)
    }

    const cart_item = await this.db.carts_products.create({
      data: { cart_id: dto.cartId, product_id: dto.itemId, count: dto.count },
    });
    return cart_item;
  }; 

  updateItemCountInCart = async (dto: ItemInCartDto) => {
    const cart_item = await this.db.carts_products.findFirst({
      where: {
        cart_id: dto.cartId,
        product_id: dto.itemId,
      },
    });
    const updated = await this.db.carts_products.update({
      where: {id:cart_item.id},
      data: { count:dto.count },
    });

    return updated
  };

  deleteItemFromCart = async (dto: DeleteItemInCartDto)=>{
    const cart_item = await this.db.carts_products.findFirst({
        where: {
          cart_id: dto.cartId,
          product_id: dto.itemId,
        },
      });
    const deleted = await this.db.carts_products.delete({
        where:{id:cart_item.id}
    })
    return deleted
  }

  deleteAllProductsFromCart = async (cartId:number)=>{
    const res = await this.db.carts_products.deleteMany({
      where:{cart_id:cartId}
    })
    return res; 
  }

  deleteCart = async (cartId:number)=>{
    const deleted = await this.db.cart.delete({
        where:{id:cartId}
    })
  }
}
