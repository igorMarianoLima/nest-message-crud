import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './database.config';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  getDatabase() {
    return this.configService.get<DatabaseConfig>('database')!;
  }
}
