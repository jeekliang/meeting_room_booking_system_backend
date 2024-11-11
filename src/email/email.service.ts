import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class EmailService {
  @Inject(RedisService)
  private redisService: RedisService;

  async sendEmail(address: string) {
    if (!address) {
      throw new HttpException('缺少email字段', HttpStatus.BAD_REQUEST);
    }
    // 检查是否重复发送
    const inRedis = await this.redisService.get(`captcha_${address}`);
    if (inRedis) {
      throw new HttpException('请2分钟后再试！', HttpStatus.BAD_REQUEST);
    }
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 1 * 60);
    return `邮箱验证码：${code}`
  }
}
