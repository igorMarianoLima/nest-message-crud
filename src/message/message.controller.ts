import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(
    @Query()
    queryParams: PaginationDto,
  ) {
    return this.messageService.findAll(queryParams);
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
    payload: CreateMessageDto,
  ) {
    return this.messageService.create(payload);
  }

  @Patch(':id')
  update(
    @Body()
    payload: UpdateMessageDto,

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
