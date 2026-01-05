import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.messageService.findOne(id);
  }

  @Post()
  create(
    @Body()
    payload: any,
  ) {
    return this.messageService.create(payload);
  }

  @Patch(':id')
  update(
    @Body()
    payload: any,

    @Param('id')
    id: string,
  ) {
    return this.messageService.update({
      id,
      body: payload,
    });
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.messageService.remove(id);
  }
}
