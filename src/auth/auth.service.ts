import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as argon from 'argon2'
import { SignInDto } from './dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name)
  private authModel: mongoose.Model<Auth>,
  private jwtService: JwtService,
  ){}

  async signup(dto: CreateAuthDto): Promise<object>{

    try {
      // Get user details
      const { name, email, password } = dto

      // Find if email exists
      const checkEmail = await this.authModel.findOne({ email: email })

      console.log(checkEmail)
      

      if(checkEmail){
        throw new ForbiddenException('Email already exists')
      }

      // Encrypt Password
      const hash = await argon.hash(password)

      // Save user to database
      const user = await this.authModel.create({
        name: name,
        email: email,
        password: hash
      })

      // Create the token
      const token = this.jwtService.sign({ id: user._id, email: user.email })

      // Return the token
      return{ token }

    } catch (error) {
      return error.message
    }

  }

  async signin(dto: SignInDto): Promise<object>{
    try {
      // Get the user by email
      const user = await this.authModel.findOne({
        email: dto.email
      })

      // Check if user exists
      if(!user){
        throw new ForbiddenException('User does not exist')
      }

      // If user exists compare the passwords
      const confirmPassword = await argon.verify(user.password, dto.password)

      // Check if password matches
      if(!confirmPassword){
        throw new ForbiddenException("Password does not match")
      }

      // Assign token
      const token = this.jwtService.sign({ id: user._id, email: user.email })

      return{ token }


    } catch (error) {
      console.log(error)
    }

  }
  
}
