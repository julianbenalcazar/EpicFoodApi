import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsOptional } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
    @IsOptional()
    restaurant: number;
}
