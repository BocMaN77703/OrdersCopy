import { IsNumber } from "class-validator";
export class ItemInCartDto {

    @IsNumber()
    cartId: number

    @IsNumber()
    itemId: number

    @IsNumber()
    count: number
}