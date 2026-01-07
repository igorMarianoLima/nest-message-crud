import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/Log.entity';

@Module({
  providers: [LoggerService],
  imports: [TypeOrmModule.forFeature([Log])],
  exports: [LoggerService],
})
export class LoggerModule {}
