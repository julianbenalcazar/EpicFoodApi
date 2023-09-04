import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDetailDto {
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsDecimal()
    @IsNotEmpty()
    total: number;

    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @IsNumber()
    @IsNotEmpty()
    productId: number;    
}
