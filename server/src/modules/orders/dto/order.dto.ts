import { IsDate, IsNumber, IsString } from 'class-validator'

export class orderDto {
    @IsString()
    name: string

    @IsString()
    last_name: string

    @IsString()
    address: string
}
