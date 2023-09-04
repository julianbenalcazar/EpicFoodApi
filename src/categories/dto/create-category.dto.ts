import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;
}
