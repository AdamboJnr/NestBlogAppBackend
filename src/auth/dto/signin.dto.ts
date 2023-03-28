import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignInDto {
    @ApiProperty()
    @IsEmail({}, { message: "Please enter valid email"})
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}