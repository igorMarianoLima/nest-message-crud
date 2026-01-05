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
    return this.messageService.create();
  }

  @Patch(':id')
  update(
    @Body()
    payload: any,

    @Param('id')
    id: string,
  ) {
    return this.messageService.update();
  }

  @Delete()
  remove() {
    return this.messageService.remove();
  }
}
