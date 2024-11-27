import { Controller, Get, Query } from '@nestjs/common';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailService } from './email.service';

export class CaptchaQuery {
  @IsNotEmpty({
    message: '邮箱地址不能为空',
  })
  @IsEmail(
    {},
    {
      message: '请输入正确的邮箱地址',
    },
  )
  address: string;
  @IsNotEmpty({
    message: '验证码类型不能为空',
  })
  type: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Get('register-captcha')
  captcha(@Query() query: CaptchaQuery) {
    return this.emailService.sendEmail(query);
  }
}
