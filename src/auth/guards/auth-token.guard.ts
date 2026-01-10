import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_ENDPOINT, REQUEST_TOKEN_PAYLOAD } from '../auth.constants';
import { Reflector } from '@nestjs/core';
import { ConfigService } from 'src/config/config.service';
import { PersonService } from 'src/person/person.service';
import { TokenPayloadDto } from '../dto/token-payload.dto';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly personService: PersonService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublicEndpoint =
      this.reflector.get(IS_PUBLIC_ENDPOINT, context.getHandler()) ?? false;

    if (isPublicEndpoint) return true;

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Not logged in');

    try {
      const jwtConfig = this.configService.getJwt().secret;

      const payload = (await this.jwtService.verifyAsync(token, {
        secret: jwtConfig,
      })) as TokenPayloadDto;

      const user = await this.personService.findOne(payload.sub);
      if (!user?.isActive) throw new ForbiddenException();

      request[REQUEST_TOKEN_PAYLOAD] = payload;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid/expired access token');
    }

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const { authorization } = request.headers;
    return authorization?.split(' ')[1];
  }
}
