import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

interface CaptchaQuery {
  address: string;
  type: string;
}

@Injectable()
export class EmailService {
  @Inject(RedisService)
  private redisService: RedisService;

  async sendEmail(params: CaptchaQuery) {
    const { address, type } = params;
    // 检查是否重复发送
    const inRedis = await this.redisService.get(`${type}_captcha_${address}`);
    if (inRedis) {
      throw new HttpException('请10分钟后再试！', HttpStatus.BAD_REQUEST);
    }
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`${type}_captcha_${address}`, code, 10 * 60);
    return `邮箱验证码：${code}`;
  }
}
