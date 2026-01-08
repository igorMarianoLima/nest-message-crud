import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { IRequestContext } from '../types/request-context.type';

@Injectable()
@Catch(HttpException)
export class ExceptionLoggingFilter<
  T extends BadRequestException,
> implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const requestContext = request['context'] as IRequestContext;

    this.loggerService.saveError({
      requestId: requestContext.requestId,
      method: requestContext.method,
      url: requestContext.url,
      message: exception.message,
      stack: exception.stack ?? '',
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
