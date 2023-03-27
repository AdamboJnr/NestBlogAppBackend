import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './schemas/auth.schema'
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateAuthDto): Promise<object>{
    return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body() dto: SignInDto): Promise<Auth>{
    return this.authService.signin(dto)
  }
}
