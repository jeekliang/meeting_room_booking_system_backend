import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { UnloginFilter } from './unlogin.filter';
// import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { CustomExceptionFilter } from './custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const expressApp = app.getHttpAdapter().getInstance();
  // 禁用 ETag
  // expressApp.disable('etag');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  // app.useGlobalInterceptors(new InvokeRecordInterceptor());
  app.useGlobalFilters(new UnloginFilter());
  app.useGlobalFilters(new CustomExceptionFilter());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
