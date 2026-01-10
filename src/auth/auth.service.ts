import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { LoginDto } from './dto/login.dto';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly personService: PersonService,
  ) {}

  async login(payload: LoginDto) {
    try {
      const user = await this.personService.findOneByEmail(payload.email);

      const isValidPassword = await this.hashingService.compare(
        payload.password,
        user.passwordHash,
      );

      if (!isValidPassword) throw new NotFoundException();

      return isValidPassword;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Invalid e-mail/password');
      }

      throw err;
    }
  }
}
