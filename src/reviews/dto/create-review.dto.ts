import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsDecimal()
  @IsNotEmpty()
  score: number;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

}
