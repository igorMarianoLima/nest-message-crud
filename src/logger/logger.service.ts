import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/Log.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log)
    private readonly loggerRepository: Repository<Log>,
  ) {}

  saveLog(payload: CreateLogDto) {
    const log = this.loggerRepository.create(payload);
    return this.loggerRepository.save(log);
  }
}
