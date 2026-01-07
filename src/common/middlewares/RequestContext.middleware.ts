import { NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { IRequestContext } from '../types/request-context.type';

export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, _, next: (error?: any) => void) {
    const context: IRequestContext = {
      requestId: randomUUID(),
      ip: req.ip ?? '',
      url: req.url,
      method: req.method,
      payload: req.body ? JSON.stringify(req.body) : undefined,
      userAgent: req.headers['user-agent'] ?? '',
      startedAt: new Date(),
    };

    req['context'] = context;

    return next();
  }
}
