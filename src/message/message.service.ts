import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(id: string) {
    return this.messageRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(payload: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(payload);
    return this.messageRepository.save(message);
  }

  async update({ id, body }: { id: string; body: UpdateMessageDto }) {
    const message = await this.messageRepository.preload({
      id,
      ...body,
    });

    if (!message) throw new NotFoundException();

    return this.messageRepository.save(message);
  }

  async remove(id: string) {
    const message = await this.findOne(id);

    if (!message) throw new NotFoundException();

    return this.messageRepository.remove(message);
  }
}
