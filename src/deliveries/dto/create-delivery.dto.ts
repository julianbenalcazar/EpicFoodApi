import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDeliveryDto {
 
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    vehicleImage: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNumber()
    userId: number;
}
