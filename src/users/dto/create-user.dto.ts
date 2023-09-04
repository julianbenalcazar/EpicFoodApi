import { IsArray, IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    image: string;

    @IsString()
    identification: string;

    @IsString()
    phone: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsArray()
    address: string[];

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    role?: string;
}
