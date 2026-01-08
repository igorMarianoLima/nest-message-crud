import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonService } from 'src/person/person.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NotificationService } from 'src/notification/adapters/notification-service.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly personService: PersonService,
    private readonly notificationService: NotificationService,
  ) {}

  findAll(pagination: PaginationDto): Promise<Message[]> {
    const { limit = 10, page = 0 } = pagination;

    return this.messageRepository.find({
      relations: {
        from: true,
        to: true,
      },
      select: {
        from: {
          id: true,
          name: true,
          email: true,
        },
        to: {
          id: true,
          name: true,
          email: true,
        },
      },
      take: limit,
      skip: page * limit,
    });
  }

  findOne(id: string) {
    return this.messageRepository.findOne({
      where: {
        id,
      },
      relations: {
        from: true,
        to: true,
      },
      select: {
        from: {
          id: true,
          name: true,
          email: true,
        },
        to: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async create(payload: CreateMessageDto): Promise<Message> {
    const sender = await this.personService.findOne(payload.from);
    const receiver = await this.personService.findOne(payload.to);

    if (!sender) throw new NotFoundException('Sender not found');
    if (!receiver) throw new NotFoundException('Receiver not found');

    const message = this.messageRepository.create({
      ...payload,
      from: sender,
      to: receiver,
    });

    await this.notificationService.send(receiver.email, payload.content);

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
