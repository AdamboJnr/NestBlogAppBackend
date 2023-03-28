import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './schemas/auth.schema'
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: Promise<object>})
  @Post('signup')
  signup(@Body() dto: CreateAuthDto): Promise<object>{
    return this.authService.signup(dto)
  }

  @ApiCreatedResponse({ type: Promise<object>})
  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: SignInDto): Promise<object>{
    return this.authService.signin(dto)
  }
}
