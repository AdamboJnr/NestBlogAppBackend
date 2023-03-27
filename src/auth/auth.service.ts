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

  async signin(dto: SignInDto): Promise<Auth>{
    
    try {
      // get the user
      const { email, password } = dto

      // Get user by email
      const userByEmail = await this.authModel.findOne({ email: email})

      if(!userByEmail){
        throw new ForbiddenException('User Email does not exist')
      }

      // If user email is found compare the password
      const confirmPasswords = await argon.verify(password, dto.password)

      if(!confirmPasswords){
        throw new ForbiddenException("Password does not Match")
      }
      // Access Token
    } catch (error) {
      return error
    }

    return await this.authModel.findOne({
      email: dto.email
    })
  }
  
}
