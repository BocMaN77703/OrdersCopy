import { IsNumber } from 'class-validator'
export class DeleteItemInCartDto {
    @IsNumber()
    cartId: number

    @IsNumber()
    itemId: number
}
