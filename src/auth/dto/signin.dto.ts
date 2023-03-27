import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignInDto {
    @IsEmail({}, { message: "Please enter valid email"})
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}