import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { IRequestContext } from '../types/request-context.type';
import { tap } from 'rxjs';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const ctx = request['context'] as IRequestContext;

    return next.handle().pipe(
      tap(async () => {
        try {
          const duration = Date.now() - ctx.startedAt.getTime();
          const status = response.statusCode;

          await this.loggerService.saveLog({
            ip: ctx.ip,
            requestId: ctx.requestId,
            method: request.method,
            url: ctx.url,
            duration,
            status,
          });
        } catch (err) {
          console.error('[RequestLoggerInterceptor] error:', err);
        }
      }),
    );
  }
}
