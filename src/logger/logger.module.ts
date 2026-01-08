import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/Log.entity';
import { ErrorLog } from './entities/Error.entity';

@Module({
  providers: [LoggerService],
  imports: [TypeOrmModule.forFeature([Log, ErrorLog])],
  exports: [LoggerService],
})
export class LoggerModule {}
