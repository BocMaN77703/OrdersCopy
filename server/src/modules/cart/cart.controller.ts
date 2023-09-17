import {
    Controller,
    Get,
    Post,
    Put,
    ParseIntPipe,
    Param,
    Body,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { ItemInCartDto } from './dto/itemInCart.dto'
import { DeleteItemInCartDto } from './dto/deleteItemInCart.dto'

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('create')
    createCart() {
        const res = this.cartService.createCart()
        return res
    }

    @Get('getProducts/:cartId')
    getProducts(@Param('cartId', ParseIntPipe) cartId: number) {
        return this.cartService.getItemsFromCart(cartId)
    }

    @Post('addProduct')
    addProductToCart(@Body() item: ItemInCartDto) {
        return this.cartService.addItemToCart(item)
    }

    @Put('updateItemCount')
    updateItemCount(@Body() item: ItemInCartDto) {
        return this.cartService.updateItemCountInCart(item)
    }

    @Post('deleteItem')
    deleteItem(@Body() item: DeleteItemInCartDto) {
        return this.cartService.deleteItemFromCart(item)
    }

    @Post('deleteCart/:cartId')
    deleteCart(@Param('cartId', ParseIntPipe) cartId: number) {
        return this.cartService.deleteCart(cartId)
    }
}
