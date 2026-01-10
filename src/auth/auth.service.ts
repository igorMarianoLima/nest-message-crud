import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { LoginDto } from './dto/login.dto';
import { PersonService } from 'src/person/person.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly personService: PersonService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    try {
      const user = await this.personService.findOneByEmail(payload.email);

      const isValidPassword = await this.hashingService.compare(
        payload.password,
        user?.passwordHash || '',
      );

      if (!isValidPassword || !user) throw new NotFoundException();
      if (!user.isActive) throw new ForbiddenException('Deactivated account');

      return await this.createTokens(user);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid e-mail/password');
      }

      throw err;
    }
  }

  private async signJwtAsync<T>({
    sub,
    payload,
    expiresIn,
  }: {
    sub: string;
    expiresIn: number;
    payload?: T;
  }) {
    const jwtConfig = this.configService.getJwt();

    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        secret: jwtConfig.secret,
        audience: jwtConfig.audience,
        issuer: jwtConfig.issuer,
        expiresIn,
      },
    );
  }

  private async createTokens(user: Person) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signJwtAsync<Partial<Person>>({
        sub: user.id,
        expiresIn: this.configService.getJwt().ttl,
        payload: {
          email: user.email,
        },
      }),
      this.signJwtAsync({
        sub: user.id,
        expiresIn: this.configService.getJwt().refreshTtl,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(payload: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(payload.refreshToken, {
        secret: this.configService.getJwt().secret,
      });

      const user = await this.personService.findOne(sub);

      if (!user) throw new Error('User not found');
      if (!user.isActive) throw new ForbiddenException('Deactivated account');

      return this.createTokens(user);
    } catch (err) {
      if (!(err instanceof ForbiddenException)) {
        throw new UnauthorizedException(err?.message);
      }

      throw err;
    }
  }
}
