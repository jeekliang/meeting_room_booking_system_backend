import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    response.statusCode = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };
    const msg = Array.isArray(res?.message) ? res?.message?.join(',') : '';

    response
      .json({
        code: exception.getStatus(),
        message: 'fail',
        data: msg || exception.message,
      })
      .end();
  }
}
