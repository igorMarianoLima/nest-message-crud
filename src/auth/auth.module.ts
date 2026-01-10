import { Global, Module } from '@nestjs/common';

import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PersonModule } from 'src/person/person.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [PersonModule, JwtModule],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashingService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
