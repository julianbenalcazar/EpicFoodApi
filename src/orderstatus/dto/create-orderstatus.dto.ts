import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderstatusDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
