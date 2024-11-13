import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Get('register-captcha')
  captcha(@Query('address') address: string) {
    return this.emailService.sendEmail(address);
  }
}
