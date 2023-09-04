import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    name: string;

    @IsArray()
    address: string[];

    @IsDate()
    @IsOptional()
    openingTime?: Date;

    @IsDate()
    @IsOptional()
    clousingTime?: Date;

    @IsString()
    image: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
