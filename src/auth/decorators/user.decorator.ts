import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_TOKEN_PAYLOAD } from '../auth.constants';
import { TokenPayloadDto } from '../dto/token-payload.dto';

export const User = createParamDecorator(
  (data: keyof TokenPayloadDto, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data
      ? request[REQUEST_TOKEN_PAYLOAD]?.[data]
      : request[REQUEST_TOKEN_PAYLOAD];
  },
);
