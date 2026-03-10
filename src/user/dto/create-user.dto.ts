import { IsEmail, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    tipo!: string;

    @IsNumber()
    @IsNotEmpty()
    edad!: number;

    @IsNumber()
    @IsNotEmpty()
    cc!: number;

    @IsNumber()
    @IsNotEmpty()
    phone!: number;

    @IsString()
    photo!: string;

    @IsNumber()
    score!: number;

    @IsNumber()
    wallet!: number;
}
