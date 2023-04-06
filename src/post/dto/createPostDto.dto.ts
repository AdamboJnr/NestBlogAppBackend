import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class createPostDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string

    @ApiProperty()
    @IsString()
    image?: string

    @ApiProperty()
    @IsArray()
    comments?: [string]

    @ApiProperty()
    @IsArray()
    likes?: [string]
}