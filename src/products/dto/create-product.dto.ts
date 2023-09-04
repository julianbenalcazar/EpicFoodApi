import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Double } from 'typeorm';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal({ decimal_digits: '2' }) // Valida que el precio sea un número decimal con 2 decimales
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
