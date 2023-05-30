import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    status < 500
      ? this.logger.warn(`${exception.message}\n${exception.stack}`)
      : this.logger.error(exception.message, exception.stack);

    response.status(status).json({
      status: 'error',
      reason: exception.message,
    });
  }
}

@Catch()
export class DefaultErrorFilter implements ExceptionFilter {
  private logger = new Logger(DefaultErrorFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.message, exception.stack);

    response.status(500).json({
      status: 'error',
      reason: 'internal_server_error',
      message: 'Something went wrong',
    });
  }
}
