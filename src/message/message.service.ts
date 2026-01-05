import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  findAll(): string[] {
    return ['Hello', 'Hi!'];
  }

  findOne(id: string): string {
    return 'Hello';
  }

  create(): string {
    return 'Created new message';
  }

  update(): string {
    return 'Updated message';
  }

  remove() {
    return 'Removed message';
  }
}
