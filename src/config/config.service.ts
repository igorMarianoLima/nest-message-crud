import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './configs/database.config';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { JwtConfig } from './configs/jwt.config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  getEnvironment() {
    return (
      this.configService.get<'development' | 'production'>('NODE_ENV') ??
      'development'
    );
  }

  getDatabase() {
    return this.configService.get<DatabaseConfig>('database')!;
  }

  getJwt() {
    return this.configService.get<JwtConfig>('jwt')!;
  }
}
