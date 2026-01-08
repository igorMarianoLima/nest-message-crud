import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/Log.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { ErrorLog } from './entities/Error.entity';
import { CreateErrorLogDto } from './dto/create-error-log.dto';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log)
    private readonly loggerRepository: Repository<Log>,

    @InjectRepository(ErrorLog)
    private readonly errorLogRepository: Repository<ErrorLog>,
  ) {}

  saveLog(payload: CreateLogDto) {
    const log = this.loggerRepository.create(payload);
    return this.loggerRepository.save(log);
  }

  saveError(payload: CreateErrorLogDto) {
    const error = this.errorLogRepository.create(payload);
    return this.errorLogRepository.save(error);
  }
}
