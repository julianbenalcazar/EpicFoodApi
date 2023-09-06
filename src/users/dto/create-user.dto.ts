import { Role } from '@app/common/enums/role.enum';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  lastname: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  image: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(10)
  identification: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(10)
  phone: string;

  @IsString()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;

  @IsArray()
  address: string[];

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  role?: Role;
}
