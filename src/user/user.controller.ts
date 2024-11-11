import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import {RegisterUserDto} from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    console.log('registerUserDto', registerUserDto);
    return await this.userService.register(registerUserDto);
  }
}
