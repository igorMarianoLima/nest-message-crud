import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { LoginDto } from './dto/login.dto';
import { PersonService } from 'src/person/person.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';

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
        user.passwordHash,
      );

      if (!isValidPassword) throw new NotFoundException();

      const jwtConfig = this.configService.getJwt();

      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: jwtConfig.secret,
          audience: jwtConfig.audience,
          issuer: jwtConfig.issuer,
          expiresIn: jwtConfig.ttl,
        },
      );

      return {
        jwt: accessToken,
      };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid e-mail/password');
      }

      throw err;
    }
  }
}
