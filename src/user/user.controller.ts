import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }

  @Post('login')
  userLogin(@Body() loginUserDto: LoginUserDto) {
    const vo = this.userService.login(loginUserDto, false);
    return vo;
  }

  @Post('admin-login')
  adminLogin(@Body() loginUserDto: LoginUserDto) {
    const vo = this.userService.login(loginUserDto, true);
    return vo;
  }
}
