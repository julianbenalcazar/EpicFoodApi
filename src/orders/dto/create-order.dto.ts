import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    deliveryId: number;

    @IsNumber()
    @IsNotEmpty()
    restaurantId: number;

    @IsNumber()
    @IsNotEmpty()
    statusId: number;
}
