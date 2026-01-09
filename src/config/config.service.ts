import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './database.config';
import { ConfigService as NestConfigService } from '@nestjs/config';

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
}
