import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  private lastId = 0;
  private messages: Message[] = [];

  findAll(): Message[] {
    return this.messages;
  }

  findOne(id: string) {
    return this.messages.find((m) => m.id.toString() === id);
  }

  create(body: any): Message {
    this.lastId += 1;

    const newMessage: Message = {
      ...body,
      id: this.lastId,
      wasRead: false,
      date: new Date(),
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update({ id, body }: { id: string; body: any }): Message {
    const messageIndex = this.messages.findIndex((m) => m.id.toString() === id);

    if (messageIndex === -1) throw new NotFoundException();

    const originalMessage = this.messages[messageIndex];

    const updatedMessage: Message = {
      ...body,
      id: originalMessage.id,
      date: originalMessage.date,
    };

    this.messages[messageIndex] = updatedMessage;

    return updatedMessage;
  }

  remove(id: string) {
    const messageIndex = this.messages.findIndex((m) => m.id.toString() === id);

    if (messageIndex === -1) throw new NotFoundException();

    this.messages.splice(messageIndex);

    return 'Removed message';
  }
}
