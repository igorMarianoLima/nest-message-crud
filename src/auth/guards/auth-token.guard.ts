import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD } from '../auth.constants';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Not logged in');

    try {
      const payload = await this.jwtService.decode(token);
      request[REQUEST_TOKEN_PAYLOAD] = payload;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Error while decoding JWT...');
    }

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const { authorization } = request.headers;
    return authorization?.split(' ')[1];
  }
}
